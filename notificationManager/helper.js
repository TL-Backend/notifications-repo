
const { notification_audits } = require('./sequelizer/models');
const { randomUUID } = require('crypto');

const exchange_name = 'notification-exchange';
const exchange_type = 'direct';

const pushNotificationParamsValidator = (params) => {
    if(!params.user_id || !params.message_type){
        return false;
    }
    return true;
}

const smsNotificationParamsValidator = (params) => {
    if(!params.user_id || !params.message_content || !params.mobile){
        return false;
    }
    return true;
}

const emailNotificationParamsValidator = (params) => {
    if(!params.user_id || !params.subject || !params.body || !params.email){
        return false;
    }
    return true;
}

const notificationsList = {
    PUSH_NOTIFICATION: pushNotificationParamsValidator,
    SMS_NOTIFICATION: smsNotificationParamsValidator,
    EMAIL_NOTIFICATION: emailNotificationParamsValidator
}

const sendMessageToQueue = async (message, routingKey, channel) => {;
    try {
        await channel.assertExchange(exchange_name, exchange_type, { durable: true });
        await channel.publish(exchange_name, routingKey, Buffer.from(message));
        console.log(`Message published with routing key '${routingKey}': ${message}`);
        return{
            error: false,
            message: "Inserted into Queue"
        }
    } catch (error) {
        console.error('Error publishing message:', error);
        return{
            error: false,
            message: error
        }
    }
}

const saveNotificationToDB = async (message, group_id, channel) => {
    try{
    //save the notification in db
    let contact = {};
    let message_content = {}
    if(!message || !group_id || !channel){
        throw new Error("Invalid params");
    }
    if(channel === "PUSH_NOTIFICATION"){
        if(!message.token || !message.message_type || !message.user_id){
            throw new Error("Invalid params for push notification type");
        }
        contact['token'] = message.token
        message_content['message_type'] = message.message_type
    }
    else if(channel === "SMS_NOTIFICATION"){
        if(!message.mobile || !message.message_content || !message.user_id){
            throw new Error("Invalid params for sms_notification type");
        }
        contact['mobile'] = message.mobile
        message_content['message'] = message.message_content
    }
    else if(channel === "EMAIL_NOTIFICATION"){
        if(!message.email || !message.subject || message.body || !message.user_id){
            throw new Error("Invalid params for email_notification type");
        }
        contact['email'] = message.email
        message_content['subject'] = message.subject
        message_content['body'] = message.body
        if(message.cc_email)
            contact['cc'] = message.cc_email
    }
    else{
        throw new Error("Invalid notification type");
    }
    const params = {
        user_id: message.user_id,
        group_id,
        channel,
        status: "Pending",
        contact_details: contact,
        content: message_content
    }
    const newNotification = await notification_audits.create(params);
    return {
        data: newNotification?.id,
        error: false,
        message: "Notification saved in DB"
    }
    }
    catch(err){
        return {
            data: undefined,
            error: true,
            message: "Internal error"
        }
    }
}

const validateNotificationType = (channels) => {
    if(!Array.isArray(channels) || channels.length === 0){
        return{
            code: 403,
            message: "Channel type should be array and it should not be empty",
            error: true
        }
    }
    let errors = [];
    channels.forEach(channel => {
        if(notificationsList[channel.notification_type] === undefined || !channel.params){
            errors.push(`${channel} is invalid data`);
            return;
        }
        const valid_param = notificationsList[channel.notification_type](channel.params);
        if (!valid_param) {
            errors.push(`${channel.notification_type} contains Invalid params`);
        }
    });
    if(errors.length){
        return{
            code: 403,
            message: errors,
            error: true
        }
    }
    return{
        error: false
    };
}


const sendChannelBasedNotification = async(channel, channelConfig) => {
    try{

    const validate = validateNotificationType(channel);
    if(validate.error){
        return validate;
    }

    let group_id = randomUUID();
    let error = false;
    let message;
    for(let index = 0; index < channel.length; index++){
        const notificationData = await saveNotificationToDB(channel[index].params, group_id, channel[index].notification_type );
        if(notificationData.error) {
            error = true;
            message = 'unable to save in DB';
            break;
        }
        channel[index].params['notification_id'] = notificationData.data;
        const resp = await sendMessageToQueue(JSON.stringify(channel[index].params), channel[index].notification_type, channelConfig);
        console.log("response....",resp)
        if(resp.error) {
            console.log('comes once', resp)
            error = true;
            message = resp.message;
            break;
        }
    }
    if(error){
        throw new Error(message);
    }
    return {
        code: 200,
        message:"Messages are Sent..."
    }
}catch(err){
    return {
        code: 400,
        message: "Internal error"
    }
}
}


module.exports = {
    sendChannelBasedNotification,
    saveNotificationToDB,
    sendMessageToQueue
};