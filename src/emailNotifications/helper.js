const AWS = require('aws-sdk');
const { notification_audits } = require('./sequelizer/models');

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


exports.sendEMAILNotification = async (param) => {
  const params = {
    Source: 'virtualdeveloper001@gmail.com', // Replace with the verified sender email address
    Destination: {
      ToAddresses: [param.email], // Replace with the recipient email address
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
    const result = sendEmail(params);
    if(result.error){
      return {
        error: false,
        message: result.message
      }
    }
    return{
        error: false,
        message: { messageId: result.MessageId } 
    }
  } catch (error) {
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

  const validateInput = (message, body) => {
    if(!message || !body){
      return true;
    }
    return false;
  }
  

exports.emailNotificationHelper = async (message) => {
  try{
    const { notification_id } = message;
    const validator = validateInput(message.email, message.body);
    if(validator){
      throw new Error("invalid params")
    }
    const response = await sendEMAILNotification(message);
    if(response.error){
      throw new Error("sending notification failed")
    }
    const resp = await updateDBNotification(response, notification_id);
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
        code: 400,
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