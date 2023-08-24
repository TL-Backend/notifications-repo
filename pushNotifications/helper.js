
const { notificationTypes } = require("./utils/notificationTypes/notificationTypes");

const { notification_audits } = require('./sequelizer/models');

const admin = require("firebase-admin");

require("dotenv").config();

const key = process.env.SERVICE_JSON_KEY;

console.log("checcking values of service account....",key)
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.SERVICE_JSON_KEY)),
});


exports.sendPushNotification = async (payload) => {
  try{
    const { title, body } = payload
    if(!title || !body){
      return{
        error: true,
        message: "Invalid params"
      }
    }
  let message;
  if (payload.data.user_id) {
    message = {
      notification: {
        title: payload?.title,
        body: payload?.body,
      },
      data: payload?.data,
      token:
        "e_LYlL27QBGKeTBqcc5CZ1:APA91bGuTTZdsTbr8VhXdpI1e_McUSfDDQyKshqGDrlWaNCruTqtQ_73c4Kk_qO8xHstReQV-rYQhMVdLtbQjaRx1u7s1wzPQXIcsQKEN4eTqyA5aLMq33UOCeUEZZSmmiqPZhgI1zN5",
    };
  } else {
    message = {
      notification: {
        title: payload?.title,
        body: payload?.body,
      },
      data: payload?.data,
      topic:
        "e_LYlL27QBGKeTBqcc5CZ1:APA91bGuTTZdsTbr8VhXdpI1e_McUSfDDQyKshqGDrlWaNCruTqtQ_73c4Kk_qO8xHstReQV-rYQhMVdLtbQjaRx1u7s1wzPQXIcsQKEN4eTqyA5aLMq33UOCeUEZZSmmiqPZhgI1zN5",
    };
  }
  const res = await admin.messaging().send(message);
  return{
    error: false,
    message: { res },
    token: "token data"
  }
  }catch(err){
    return{
      error: true,
      message: { err }
    }
  }
};

exports.updateDBNotification = async (resp, id) => {
  try{
  let updateParams = {};
  if(!resp || !id){
    throw new Error("Invalid params to process the request")
  }
  if(resp.error){
    updateParams["status"] = "Failed";
    updateParams["error_response"] = resp.message
  }
  else{
    updateParams["status"] = "Success";
    updateParams["success_response"] = resp.message
  }
  updateParams["contact_details"] = { token: resp.token}
  await notification_audits.update(
    updateParams,
    {
      where: { id }, // The condition to match the row by its id
      returning: false, // Returns the affected rows
    }
  );
  return {
    error: false,
    message: "Notification updated successfully"
  }
  }catch(err){
    return {
      error: true,
      message: "Internal error"
    }
  }
}

exports.pushNotificationHelper = async (message) => {
    try
    {
    const { message_type, notification_id } = message;
    const messageType = notificationTypes[message_type];
    if (!messageType || message_type === undefined) {
      return {
        message: "Invalid Notifcation type",
        error: true,
        code: 400,
      };
    }
    const payload = messageType(message);
    if (payload.error) {
      return payload;
    }
    const response = await sendPushNotification(payload.notificationPayload);
    const resp = await updateDBNotification(response, notification_id);
    if(resp.error){
      throw new Error("error while updating notification");
    }
    return {
      code: 200,
      error: false,
      message: "Message sent successfully"
    }
  } catch (err) {
    return {
      error: true,
      message: "Internal error"
    }
  }
}

// module.exports = {
//     pushNotificationHelper,
//     updateDBNotification,
//     sendPushNotification
// }