const {
  notificationTypes,
} = require("./utils/notificationTypes/notificationTypes");

const { notification_audits } = require("./sequelizer/models");

const admin = require("firebase-admin");

const environment = process.env.NODE_ENV || "development";
const envFilePath = `config/${environment}.env`;
require("dotenv").config({ path: envFilePath });

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.SERVICE_JSON_KEY)),
});

exports.sendPushNotification = async (payload, token) => {
  try {
    const { title, body } = payload;
    if (!title || !body) {
      return {
        error: true,
        message: "Invalid params",
      };
    }
    let message;
    if (payload.data.user_id) {
      message = {
        notification: {
          title: payload?.title,
          body: payload?.body,
        },
        data: payload?.data,
        token: token,
      };
    } else {
      message = {
        notification: {
          title: payload?.title,
          body: payload?.body,
        },
        data: payload?.data,
        topic:
          "eRqh76O2Q6y6puMrWQX6YY:APA91bHd0oLmWcy6FzZeuqGKi-aB_XfiwyAJkVo7zkC7OD9IZ2zwaYn36jxHkBy6C0Id9HgKay3cmZcjDaYLR3s9vw4QwRpXTha89CtDLZC9NkNED4Kmyg0n0nyi_pPqMS11DpfRw0I6",
      };
    }
    const res = await admin.messaging().send(message);
    console.log("response..");
    console.log(res);
    return {
      error: false,
      message: { res },
      token: "token data",
    };
  } catch (err) {
    return {
      error: true,
      message: { err },
    };
  }
};

exports.updateDBNotification = async (resp, id) => {
  try {
    let updateParams = {};
    if (!resp || !id) {
      throw new Error("Invalid params to process the request");
    }
    if (resp.error) {
      updateParams["status"] = "Failed";
      updateParams["error_response"] = resp.message;
    } else {
      updateParams["status"] = "Success";
      updateParams["success_response"] = resp.message;
    }
    await notification_audits.update(updateParams, {
      where: { id }, // The condition to match the row by its id
      returning: false, // Returns the affected rows
    });
    return {
      error: false,
      message: "Notification updated successfully",
    };
  } catch (err) {
    return {
      error: true,
      message: "Internal error",
    };
  }
};

exports.pushNotificationHelper = async (payload) => {
  try {
    const { contact_info, notification_type, notification_id } = payload;
    const messageType = notificationTypes[notification_type];
    if (!messageType) {
      let response = { error: true, message: "Invalid Notification type" };
      await this.updateDBNotification(response, notification_id);
      return {
        message: "Invalid Notification type",
        error: true,
        code: 400,
      };
    }
    const messagePayload = messageType(payload);
    const response = await this.sendPushNotification(
      messagePayload,
      contact_info.token,
    );
    const resp = await this.updateDBNotification(response, notification_id);
    if (resp.error) {
      throw new Error("error while updating notification");
    }
    return {
      code: 200,
      error: false,
      message: "Message sent successfully",
    };
  } catch (err) {
    console.log("err-->", err);
    return {
      error: true,
      message: "Internal error",
    };
  }
};
