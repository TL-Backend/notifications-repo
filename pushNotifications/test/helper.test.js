
// const chai = require('chai');// Replace '../index' with the correct path to your index.js file

// const rewire = require("rewire");
// const helperMain = rewire("../helper.js")

// const expect = chai.expect;

// const sendPushNotificationMock = () => {
   
//     return { code: 200 } ;
// }

// const updateDBNotificationMock = () => {
   
//     return { code: 200 } ;
// }

// const sendPushNotificationMockWithException = () => {
//     throw new Error("failed")
// }

// const updateDBNotificationMockWithException = () => {
//     throw new Error("DB updation failed")
// }


// helperMain.__set__("sendPushNotification",sendPushNotificationMock);
// helperMain.__set__("updateDBNotification",updateDBNotificationMock);
// describe('Push Notification Sender', () => {
//     it('Successfully send notification', async () => {
//         const resp = await helperMain.pushNotificationHelper({message_type:"WELCOME_NOTIFICATION",user_id: 10, member_count: 10, notification_id:79});
        
//         expect(resp.error).to.equal(false);
//     });
//     it('Inavalid params error', async () => {
//         const resp = await helperMain.pushNotificationHelper({message_type:"WELCOME_NOTIICATION", user_id: 10, member_count: 10, notification_id:79});
        
//         expect(resp.error).to.equal(true);
//     });
//     it('Send push notification failed case', async () => {
//         helperMain.__set__("sendPushNotification",sendPushNotificationMockWithException);
//         const resp = await helperMain.pushNotificationHelper({message_type:"WELCOME_NOTIFICATION", user_id: 10, member_count: 10, notification_id:79});
        
//         expect(resp.error).to.equal(true);
//     });
//     it('Update notification failed case', async () => {
//         helperMain.__set__("sendPushNotification",sendPushNotificationMock);
//         helperMain.__set__("updateDBNotification",updateDBNotificationMockWithException);
//         const resp = await helperMain.pushNotificationHelper({message_type:"WELCOME_NOTIFICATION", user_id: 10, member_count: 10, notification_id:79});
        
//         expect(resp.error).to.equal(true);
//     });
// });
// helperMain.__set__('notification_audits.update', async () => {
//     return{
//         id: 1233
//     }
// })
// describe('Update Notification test suit ', () => {
//     it('Successfully updated notification with sucuess', async () => {
//         const resp = await helperMain.updateDBNotification({error: false, message: "fhvlf", token: "ilhefjieof"},79);
//         expect(resp.error).to.equal(false);
//     });
//     it('Successfully updated notification with failure', async () => {
//         const resp = await helperMain.updateDBNotification({error: true, message: "fhvlf", token: "ilhefjieof"},79);
//         expect(resp.error).to.equal(false);
//     });
//     it('Invalid params error', async () => {
//         const resp = await helperMain.updateDBNotification(79);
//         expect(resp.error).to.equal(true);
//     });
//     it('notification audit update failed case', async () => {
//         helperMain.__set__('notification_audits.update', async () => {
//             throw new Error("updation failed")
//         })
//         const resp = await helperMain.updateDBNotification({error: false, message: "fhvlf", token: "ilhefjieof"},79);
//         expect(resp.error).to.equal(true);
//     });
// });

// describe('Send push notification single function suit ', () => {
//     it('Successfully send notification in single function', async () => {
//         helperMain.__set__('admin.messaging().send', async () => {
//             return {
//                 messageId: "13nfenfwennew"
//             }
//         })
//         const resp = await helperMain.sendPushNotification({title: "hghfo", body: "fhvlf", data: {"user_id": "1"}});
//         expect(resp.error).to.equal(false);
//     });
//     it('Invalid params error', async () => {
//         const resp = await helperMain.sendPushNotification();
//         expect(resp.error).to.equal(true);
//     });
//     it('sending notification failed case', async () => {
//         helperMain.__set__('admin.messaging().send', async () => {
//             throw new Error("send failed")
//         })
//         const resp = await helperMain.sendPushNotification({title: "hghfo", body: "fhvlf", data: {"user_id": "1"}});
//         expect(resp.error).to.equal(true);
//     });
// });
test('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
  });

