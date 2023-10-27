const { aergov_notification_audits } = require("./services/aerpace-ecosystem-backend-db/src/databases/postgresql/models");
const { randomUUID } = require("crypto");
const { notificationTypes } = require("./notificationTypes/notificationTypes");
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

exports.saveNotificationToDB = async (payload, group_id, channel) => {
  try {
    //save the notification in db
    const params = {
      user_id: payload.user_id,
      group_id,
      channel,
      status: "Pending",
      contact_details: payload?.contact_info,
      dynamic_content: payload?.content,
      notification_type: payload.notification_type
    };
    const newNotification = await aergov_notification_audits.create(params);
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

exports.sendChannelBasedNotification = async (payload, channelConfig) => {
  try {
    const { contact_info, notification_type, notification_id } = payload;
    const notificationType = notificationTypes[notification_type];
    if(!notificationType){
      return {
        code: 400,
        message: "Invalid notification_type",
      };
    }
    const validateInput = notificationType(payload);
    if(validateInput.error){
      return{
        code: 400,
        message: validateInput.message
      }
    }
    let group_id = randomUUID();
    let error = false;
    let message;
    for (const element of payload.channels) {
      const notificationData = await this.saveNotificationToDB(
        payload,
        group_id,
        element,
      );
      if (notificationData.error) {
        error = true;
        message = "Unable to save in DB.";
        break;
      }
      payload["notification_id"] = notificationData.data;
      const resp = await this.sendMessageToQueue(
        JSON.stringify(payload),
        element,
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
      data: {},
      code: 200,
      message: "Messages are Sent...",
    };
  } catch (err) {
    console.log("err",err)
    return {
      code: 400,
      message: "Internal error",
    };
  }
};

