const chai = require('chai');
const rewire = require("rewire");
const helperMain = rewire("../helper.js");
const singleFunctionCheck = require("../helper.js");
const validator = require("../validate/validateParams")
const expect = chai.expect;

const  saveNotificationToDBMock = async () => {
    return {
        data: 1,
        error: false,
        message: "Notification saved in DB"
    }
}

const  saveNotificationToDBExceptionMock = async () => {    
    return {
        error: true,
        message: "unable save to db"
    }
}
const sendMessageToQueueMock = async () => {
        return {
            error: false,
            message: "Message inserted to Queue"
        }
}

const sendMessageToQueueMockWithException = async () => {
    return {
        error: true,
        message: "Unable to insert to queue"
    }
}

helperMain.__set__("saveNotificationToDB",saveNotificationToDBMock);
helperMain.__set__("sendMessageToQueue",sendMessageToQueueMock);


describe.only('Notification Manager', () => {
    
    it('Notification sucess case ', async () => {
        const input = [
            {
                notification_channel: 'PUSH_NOTIFICATION',
                params: {
                    user_id: 'user123',
                    token: 'push-token',
                    message_type: 'info',
                },
            },
            {
                notification_channel: 'SMS_NOTIFICATION',
                params: {
                    user_id: 'user456',
                    mobile: '1234567890',
                message_content: 'SMS Content',
            },
        },
    ];
    const resp = await helperMain.sendChannelBasedNotification(input);
    expect(resp.code).to.equal(200);
    expect(resp.message).to.equal('Messages are Sent...');
});

it('Notification Failed case DB', async () => {
        helperMain.__set__("saveNotificationToDB",saveNotificationToDBExceptionMock);
        const input = [
            {
                notification_channel: 'PUSH_NOTIFICATION',
                params: {
                    user_id: 'user123',
                    token: 'push-token',
                    message_type: 'info',
                },
            },
            {
                notification_channel: 'SMS_NOTIFICATION',
                params: {
                    user_id: 'user456',
                    mobile: '1234567890',
                    message_content: 'SMS Content',
                },
            },
        ];
        const resp = await helperMain.sendChannelBasedNotification(input);
        expect(resp.code).to.equal(400);
        expect(resp.message).to.equal("Internal error");
    });
    it('Notification Failed case Queue error', async () => {
        helperMain.__set__("saveNotificationToDB",saveNotificationToDBMock);
        helperMain.__set__("sendMessageToQueue",sendMessageToQueueMockWithException);
        const input = [
            {
                notification_channel: 'PUSH_NOTIFICATION',
                params: {
                    user_id: 'user123',
                    token: 'push-token',
                    message_type: 'info',
                },
            },
            {
                notification_channel: 'SMS_NOTIFICATION',
                params: {
                    user_id: 'user456',
                    mobile: '1234567890',
                    message_content: 'SMS Content',
                },
            },
        ];
        const resp = await helperMain.sendChannelBasedNotification(input);
        expect(resp.code).to.equal(400);
        expect(resp.message).to.equal("Internal error");
    });
    it('Notification failed case With input validations error', async () => {
        const input = [
            {
                notification_channel: '',
                params: {
                    user_id: 'user123',
                    token: 'push-token',
                    message_type: 'info',
                },
            },
            {
                notification_channel: 'SMS_NOTIFICATION',
                params: {
                    user_id: 'user456',
                    mobile: '1234567890',
                message_content: 'SMS Content',
            },
        },
    ];
    helperMain.__set__("saveNotificationToDB",saveNotificationToDBExceptionMock);
    const resp = await helperMain.sendChannelBasedNotification(input);
    expect(resp.code).to.equal(403);
    });
});
helperMain.__set__("saveNotificationToDB",saveNotificationToDBMock)

helperMain.__set__('notification_audits.create', async () => {
    return{
        id: 1233
    }
})

describe.only('DB Operations', () => {
    it('Notification saved sucess case with push notification ', async () => {
        const resp = await helperMain.saveNotificationToDB({token:"hello world", message_type:"push", user_id: "3433"},'2211','PUSH_NOTIFICATION');
        console.log("in db check",resp)
        expect(resp.error).to.equal(false);
        expect(resp.message).to.equal("Notification saved in DB");
    });
    

    it('Notification saved sucess case with sms notification ', async () => {
        const resp = await helperMain.saveNotificationToDB({mobile:"hello world", message_content:"push", user_id: "3433"},'2211','SMS_NOTIFICATION');
        expect(resp.error).to.equal(false);
        expect(resp.message).to.equal("Notification saved in DB");
    });

    it('Notification saved sucess case with email notification ', async () => {
        const resp = await helperMain.saveNotificationToDB({body:"hello world", email:"push", user_id: "3433" , cc_email: "enhkhc"},'2211','EMAIL_NOTIFICATION');
        expect(resp.error).to.equal(false);
        expect(resp.message).to.equal("Notification saved in DB");
    });

    it('Notification missing params case ', async () => {
        const resp = await singleFunctionCheck.saveNotificationToDB();
        expect(resp.message).to.equal("Internal error");
        expect(resp.error).to.equal(true);
    });
    it('Invalid notification type ', async () => {
        const resp = await singleFunctionCheck.saveNotificationToDB({token:"hello world", message_type:"push", user_id: "2332"},'2211','PUSH_NOTIFICATIONS');
        expect(resp.message).to.equal("Internal error");
        expect(resp.error).to.equal(true);
    });
    it('Invalid params for Push notification ', async () => {
        const resp = await singleFunctionCheck.saveNotificationToDB({},'2211','PUSH_NOTIFICATION');
        expect(resp.message).to.equal("Internal error");
        expect(resp.error).to.equal(true);
    });
    it('Invalid params for sms notification ', async () => {
        const resp = await singleFunctionCheck.saveNotificationToDB({message_content:"hello dev"},'2211','SMS_NOTIFICATION');
        expect(resp.message).to.equal("Internal error");
        expect(resp.error).to.equal(true);
    });
    it('Invalid params for email notification ', async () => {
        const resp = await singleFunctionCheck.saveNotificationToDB({subject:"hello dev"},'2211','EMAIL_NOTIFICATION');
        expect(resp.message).to.equal("Internal error");
        expect(resp.error).to.equal(true);
    });
});

describe.only('Input fields test suit', () => {
    it('pushNotificationParamsValidator sucuss test case ', async () => { 
        const resp = validator.pushNotificationParamsValidator({user_id: 1, message_type:"eur"});
        expect(resp).to.equal(true);
    });

    it('pushNotificationParamsValidator failure test case ', async () => { 
        const resp = validator.pushNotificationParamsValidator({message_type:"eur"});
        expect(resp).to.equal(false);
    });

    it('smsNotificationParamsValidator sucuss test case ', async () => { 
        const resp = validator.smsNotificationParamsValidator({user_id: 1, message_content:"eur", mobile: "7377373333"});
        expect(resp).to.equal(true);
    });

    it('smsNotificationParamsValidator failure test case ', async () => { 
        const resp = validator.smsNotificationParamsValidator({user_id: 1, message_content:"eur"});
        expect(resp).to.equal(false);
    });

    it('emailNotificationParamsValidator sucuss test case ', async () => { 
        const resp = validator.emailNotificationParamsValidator({user_id: 1, body:"eur", email: "dehciueg"});
        expect(resp).to.equal(true);
    });

    it('emailNotificationParamsValidator failure test case ', async () => { 
        const resp = validator.emailNotificationParamsValidator({user_id: 1});
        expect(resp).to.equal(false);
    });

    it('Valid input check test ', async () => { 
        const input = "hello"
        const resp = validator.validateNotificationType(input);
        expect(resp.error).to.equal(true);
    });

    it('Valid input check test invalid sub data ', async () => { 
        const input = [
            {
                notification_channel: '',
                params: {
                    user_id: 'user123',
                    token: 'push-token',
                    message_type: 'info',
                },
            },
            {
                notification_channel: 'SMS_NOTIFICATION',
                params: {
                    user_id: 'user456',
                    mobile: '1234567890',
                message_content: 'SMS Content',
            },
        },
    ];
        const resp = validator.validateNotificationType(input);
        expect(resp.error).to.equal(true);
    });
    it('success case of input valid ', async () => { 
        const input = [
            {
                notification_channel: 'PUSH_NOTIFICATION',
                params: {
                    user_id: 'user123',
                    token: 'push-token',
                    message_type: 'info',
                },
            },
            {
                notification_channel: 'SMS_NOTIFICATION',
                params: {
                    user_id: 'user456',
                    mobile: '1234567890',
                message_content: 'SMS Content',
            },
        },
    ];
        const resp = validator.validateNotificationType(input);
        expect(resp.error).to.equal(false);
    });

})



  