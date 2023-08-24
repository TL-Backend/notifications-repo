const { notification_audits } = require("./sequelizer/models");
const { randomUUID } = require("crypto");

const exchange_name = "notification-exchange";
const exchange_type = "direct";
const {
  validateNotificationType,
} = require("./validate/validateParams");

exports.sendMessageToQueue = async (message, routingKey, channel) => {
  try {
    await channel.assertExchange(exchange_name, exchange_type, {
      durable: true,
    });
    await channel.publish(exchange_name, routingKey, Buffer.from(message));
    console.log(
      `Message published with routing key '${routingKey}': ${message}`,
    );
    return {
      error: false,
      message: "Inserted into Queue",
    };
  } catch (error) {
    console.error("Error publishing message:", error);
    return {
      error: false,
      message: error,
    };
  }
};

exports.saveNotificationToDB = async (message, group_id, channel) => {
  try {
    //save the notification in db
    let contact = {};
    let message_content = {};
    if (!message || !group_id || !channel) {
      throw new Error("Invalid params");
    }
    if (channel === "PUSH_NOTIFICATION") {
      contact["token"] = message.token;
      message_content["message_type"] = message.message_type;
    } else if (channel === "SMS_NOTIFICATION") {
      contact["mobile"] = message.mobile;
      message_content["message"] = message.message_content;
    } else if (channel === "EMAIL_NOTIFICATION") {
      contact["email"] = message.email;
      message_content["subject"] = message.subject || "";
      message_content["body"] = message.body;
      if (message.cc_email) contact["cc"] = message.cc_email;
    } else {
      throw new Error("Invalid notification type");
    }
    const params = {
      user_id: message.user_id,
      group_id,
      channel,
      status: "Pending",
      contact_details: contact,
      content: message_content,
    };
    const newNotification = await notification_audits.create(params);
    if (newNotification.id) {
      return {
        data: newNotification?.id,
        error: false,
        message: "Notification saved in DB",
      };
    }
  } catch (err) {
    return {
      data: undefined,
      error: true,
      message: "Internal error",
    };
  }
};

exports.sendChannelBasedNotification = async (channel, channelConfig) => {
  try {
    const validate = validateNotificationType(channel);
    if (validate.error) {
      return validate;
    }

    let group_id = randomUUID();
    let error = false;
    let message;
    for (let index = 0; index < channel.length; index++) {
      const notificationData = await saveNotificationToDB(
        channel[index].params,
        group_id,
        channel[index].notification_type,
      );
      if (notificationData.error) {
        error = true;
        message = "unable to save in DB";
        break;
      }
      channel[index].params["notification_id"] = notificationData.data;
      const resp = await sendMessageToQueue(
        JSON.stringify(channel[index].params),
        channel[index].notification_type,
        channelConfig,
      );
      if (resp.error) {
        error = true;
        message = resp.message;
        break;
      }
    }
    if (error) {
      throw new Error(message);
    }
    return {
      code: 200,
      message: "Messages are Sent...",
    };
  } catch (err) {
    return {
      code: 400,
      message: "Internal error",
    };
  }
};

// module.exports = {
//     pushNotificationParamsValidator,
//     smsNotificationParamsValidator,
//     emailNotificationParamsValidator
// };
