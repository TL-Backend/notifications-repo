// const chai = require("chai"); // Replace '../index' with the correct path to your index.js file

// const rewire = require("rewire");
// const helperMain = rewire("../helper.js");

// const expect = chai.expect;

// const sendSMSNotificationMock = () => {
//   return { code: 200, error: false };
// };

// const updateDBNotificationMock = () => {
//   return { code: 200, error: false };
// };

// const sendSMSNotificationMockWithException = () => {
//     return {
//         error: true
//     }
// }

// const updateDBNotificationMockWithException = () => {
//     return {
//         error: true
//     }
// }

// helperMain.__set__("sendSMSNotification", sendSMSNotificationMock);
// helperMain.__set__("updateDBNotification", updateDBNotificationMock);

// describe("SMS Notification Sender", () => {
//   it("Successful SMS notification", async () => {
//     const resp = await helperMain.smsNotificationHelper({
//       message_content: "kvnhdlvs",
//       mobile: "+91838385415",
//       notification_id: 100,
//     });
//     expect(resp.error).to.equal(false);
//     expect(resp.message).to.equal("SMS successfully sent!");
//   });

//   it("Invalid input case", async () => {
//     const resp = await helperMain.smsNotificationHelper({
//       notification_id: 100,
//     });
//     expect(resp.error).to.equal(true);
//     expect(resp.message).to.equal("Internal error");
//   });

//   it("Failed SMS notification due to sender", async () => {
//     helperMain.__set__("sendSMSNotification", sendSMSNotificationMockWithException);
//     const resp = await helperMain.smsNotificationHelper({
//       message_content: "kvnhdlvs",
//       mobile: "+91838385415",
//       notification_id: 100,
//     });
//     expect(resp.error).to.equal(true);
//     expect(resp.message).to.equal("Internal error");
//   });

//   it("Failed SMS notification due to DB save", async () => {
//     helperMain.__set__("sendSMSNotification", sendSMSNotificationMock);
//     helperMain.__set__("updateDBNotification", updateDBNotificationMockWithException);
//     const resp = await helperMain.smsNotificationHelper({
//       message_content: "kvnhdlvs",
//       mobile: "+91838385415",
//       notification_id: 100,
//     });
//     expect(resp.error).to.equal(true);
//     expect(resp.message).to.equal("Internal error");
//   });
// });



// helperMain.__set__("notification_audits.update", async () => {
//   return {
//     id: 1233,
//   };
// });
// describe("Update Notification test suit ", () => {
//   it("Successfully updated notification with success response", async () => {
//     const resp = await helperMain.updateDBNotification(
//       { error: false, message: "fhvlf" },
//       79,
//     );
//     console.log("hello ", resp);
//     expect(resp.error).to.equal(false);
//   });

//   it("Successfully updated notification with failed response", async () => {
//     const resp = await helperMain.updateDBNotification(
//       { error: true, message: "fhvlf" },
//       79,
//     );
//     console.log("hello ", resp);
//     expect(resp.error).to.equal(false);
//   });

//   it("Invalid params error", async () => {
//     const resp = await helperMain.updateDBNotification(79);
//     console.log("hello ", resp);
//     expect(resp.error).to.equal(true);
//   });

//   it("notification audit update failed case", async () => {
//     helperMain.__set__("notification_audits.update", async () => {
//       throw new Error("updation failed");
//     });
//     const resp = await helperMain.updateDBNotification(
//       { err: false, message: "fhvlf" },
//       79,
//     );
//     console.log("hello ", resp);
//     expect(resp.error).to.equal(true);
//   });
// });

// helperMain.__set__("sendSMS", async () => {
//   return {
//     error: false,
//     message: {},
//   };
// });

// describe("Send SMS test suit ", () => {
//   it("Successfully send sms notification", async () => {
//     const resp = await helperMain.sendSMSNotification(
//       "kvnhdlvs",
//       "+91838385415",
//     );
//     console.log("hello ", resp);
//     expect(resp.error).to.equal(false);
//   });

//   it("sns publish error case", async () => {
//     helperMain.__set__("sendSMS", async () => {
//       return {
//         error: true,
//         message: {},
//       };
//     });

//     const resp = await helperMain.sendSMSNotification(
//       "kvnhdlvs",
//       "+91838385415",
//     );
//     console.log("hello ", resp);
//     expect(resp.error).to.equal(true);
//   });
// });
