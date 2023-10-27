const pushNotificationParamsValidator = (params) => {
    return !(!params.user_id || !params.message_type);
}

const smsNotificationParamsValidator = (params) => {
    return !(!params.user_id || !params.message_content || !params.mobile);
}

const emailNotificationParamsValidator = (params) => {
    return !(!params.user_id || !params.body || !params.email);
}

const notificationsList = {
    PUSH_NOTIFICATION: pushNotificationParamsValidator,
    SMS_NOTIFICATION: smsNotificationParamsValidator,
    EMAIL_NOTIFICATION: emailNotificationParamsValidator
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
        if(notificationsList[channel.notification_channel] === undefined || !channel.params){
            errors.push(`${channel} is invalid data`);
            return;
        }
        const valid_param = notificationsList[channel.notification_channel](channel.params);
        if (!valid_param) {
            errors.push(`${channel.notification_channel} contains Invalid params`);
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


module.exports = {
    pushNotificationParamsValidator,
    smsNotificationParamsValidator,
    emailNotificationParamsValidator,
    validateNotificationType
};