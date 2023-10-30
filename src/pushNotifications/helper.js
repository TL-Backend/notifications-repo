const {
  notificationTypes,
} = require("./utils/notificationTypes/notificationTypes");

const {
  aergov_notification_audits,
} = require("./services/aerpace-ecosystem-backend-db/src/databases/postgresql/models");

const admin = require("firebase-admin");

const { getUserTokens, deleteToken } = require("./tokens/token.helper");

const environment = process.env.NODE_ENV || "development";
const envFilePath = `config/${environment}.env`;
require("dotenv").config({ path: envFilePath });

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.SERVICE_JSON_KEY)),
});

exports.sendPushNotification = async (payload, user_id) => {
  try {
    const tokens = await getUserTokens(user_id);
    if( !tokens.length) {
      return {
        error: true,
        message: "Token Not found.",
      };
    }
    const { title, body } = payload;
    let respArray = [];
    tokens.forEach(async (data) => {
      try {
        let message = {
          notification: {
            title: title,
            body: body,
          },
          data: payload?.data,
          token: data.token,
        };
        let resp = await admin.messaging().send(message);
        respArray.push(resp);
      } catch (err) {
        await deleteToken(data.id);
      }
    });
    return {
      error: false,
      message: respArray,
    };
  } catch (err) {
    return {
      error: true,
      message: { err },
    };
  }
};

exports.  updateDBNotification = async (resp, id) => {
  
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
    await aergov_notification_audits.update(updateParams, {
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
  const { notification_type, notification_id, user_id } = payload;
  try {
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
    const response = await this.sendPushNotification(messagePayload, user_id);
    const dbResponse = await this.updateDBNotification(
      response,
      notification_id,
    );
    if (dbResponse.error) {
      throw new Error("error while updating notification");
    }
    return {
      code: 200,
      error: false,
      message: "Message sent successfully",
    };
  } catch (err) {
    console.log("err-->", err);
    await this.updateDBNotification(
      { error: true, message: "Language Not Found" },
      notification_id,
    );
    return {
      error: true,
      message: "Internal error",
    };
  }
};
