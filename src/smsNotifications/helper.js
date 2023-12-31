const AWS = require('aws-sdk');
const { notification_audits } = require('./sequelizer/models');
const dotenv = require('dotenv');
dotenv.config({
  path: `.env`,
});
// console.log(process.env.ACCESS_KEY_ID,process.env.SECRET_ACCESS_KEY,process.env.REGION)
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
  });

const sns = new AWS.SNS();

const sendSMS = (params) => {
  return new Promise((resolve, reject) => {
    sns.publish(params, (err, data) => {
      if (err) {
        console.error('Error sending SMS:', err);
        reject({
          error: true,
          message: err
        });
      } else {
        console.log('SMS sent successfully:', data);
        resolve({
          error: false,
          message: data
        });
      }
    });
  });
};

exports.sendSMSNotification = async (message_content,mobile) => {
  try {
    const params = {
        Message: message_content, // The content of your SMS message
        PhoneNumber: mobile, // The phone number to which you want to send the SMS (include country code)
        MessageAttributes: {
          'AWS.SNS.SMS.SMSType': {
            DataType: 'String',
            StringValue: 'Transactional' // Change to 'Transactional' if it's a transactional message
          }
        }
      };
      
      const resp = await sendSMS(params);
      console.log("respnse...")
      console.log(resp)
      return resp;
    }catch(err){
      return{
        error: true,
        message: "Internal error"
      }
    }
}

exports.updateDBNotification = async (resp, id) => {
  try{
  let updateParams = {};
  if(!resp || !id){
    return {
      error: true,
      message: "Invalid params to process the request"
    }
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

const validateInput = (message, mobile) => {
  if(!message || !mobile){
    return true;
  }
  return false;
}

exports.smsNotificationHelper = async (input) => {
  try{
    const validator = validateInput(input.message_content, input.mobile)
    if(validator){
      throw new Error("Invalid params")
    }
    const response = await this.sendSMSNotification(input.message_content, input.mobile);
    if(response.error){
      throw new Error("sending notification failed")
    }
    const resp = await this.updateDBNotification(response, input?.notification_id);
    if(resp.error){
      throw new Error("Updating notification failed")
    }
    return {
      error: false,
      message: "SMS successfully sent!"
    }
  }catch(err){
    return {
      error: true,
      message: "Internal error"
    }
  }
}

// module.exports. = {
//     smsNotificationHelper,
//     updateDBNotification,
//     sendSMSNotification
// }