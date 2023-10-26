const AWS = require('aws-sdk');
const { notification_audits } = require('./sequelizer/models');
require("dotenv").config();
const { notificationTypes } = require("./utils/notificationTypes/notificationTypes");
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.sendEmail = (params) => {
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.error('Error sending Email:', err);
        reject({
          error: true,
          message: err
        });
      } else {
        console.log('Email sent successfully:', data);
        resolve({
          error: false,
          message: data
        });
      }
    });
  });
};


exports.sendEMAILNotification = async (param, email) => {
  const params = {
    Source: 'pradeep@tilicho.in', // Replace with the verified sender email address
    Destination: {
      ToAddresses: [email], // Replace with the recipient email address
    },
    Message: {
      Subject: {
        Data: param.subject,
      },
      Body: {
        Text: {
          Data: param.body,
        },
      },
    },
  };

  try {
    const result = await this.sendEmail(params);
    console.log("check test", result)
    if(result.error){
      return {
        error: true,
        message: result.message
      }
    }
    return{
        error: false,
        message: { messageId: result.message.MessageId } 
    }
  } catch (error) {
    console.log("ERR...",err)
    return { 
        error: true,
        message: { error }
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
    await notification_audits.update(
      updateParams,
      {
        where: { id }, // The condition to match the row by its id
        returning: false, // Returns the affected rows
      }
    );
    return{
      error: false,
      message: "Notification updated successfully"
    }
    }catch(err){
      return {
        error: true,
        message:"Internal error"
      }
    }
  }

  const validateInput = (data) => {
    if(!data.email || !data.body || !data.subject){
      return {
        error: true,
        message: "Email and Body and Subject required."
      }
    }
    return {
      error: false,
    }
  }
  

exports.emailNotificationHelper = async (payload) => {
  try{
    const { contact_info, notification_type, notification_id } = payload;
    const messageType = notificationTypes[notification_type];
    if (!messageType) {
      let response = { error: true, message: 'Invalid Notification type' }
      await this.updateDBNotification(response, notification_id);
      return {
        message: "Invalid Notification type",
        error: true,
        code: 400,
      };
    }
    const messagePayload = messageType(payload);
    const response = await this.sendEMAILNotification(messagePayload, contact_info.email);
    const resp = await this.updateDBNotification(response, notification_id);
    if(resp.error){
      throw new Error("Updation of notification failed")
    }
    return {
      code: 200,
      error: false,
      message: "Email send successfully"
    }
  }catch(err){
      return {
        code: 500,
        error: true,
        message: "Internal error"
      }
  }
}

// module.exports. = {
//     emailNotificationHelper,
//     updateDBNotification,
//     sendEMAILNotification,
//     sendEmail
// }