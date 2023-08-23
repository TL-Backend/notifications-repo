// const chai = require("chai"); // Replace '../index' with the correct path to your index.js file

// const rewire = require("rewire");
// const helperMain = rewire("../helper.js");

// const expect = chai.expect;

// const sendEMAILNotificationMock = () => {
//   return { code: 200, error: false };
// };

// const updateDBNotificationMock = () => {
//   return { code: 200, error: false };
// };

// const sendEMAILNotificationMockWithExeception = () => {
//   return { code: 200, error: true };
// };

// const updateDBNotificationMockWithExeception = () => {
//   return { code: 200, error: true };
// };

// helperMain.__set__("sendEMAILNotification", sendEMAILNotificationMock);
// helperMain.__set__("updateDBNotification", updateDBNotificationMock);

// describe("Email Notification Sender", () => {
//   it("Successfully send email notification", async () => {
//     const resp = await helperMain.emailNotificationHelper({
//       email: "vikas@tilicho.in",
//       subject: "hello",
//       body: "World",
//       notification_id: 22,
//     });
//     expect(resp.error).to.equal(false);
//   });

//   it("Failed send email notification due to DB faiure", async () => {
//     helperMain.__set__(
//       "updateDBNotification",
//       updateDBNotificationMockWithExeception,
//     );
//     const resp = await helperMain.emailNotificationHelper({
//       email: "vikas@tilicho.in",
//       subject: "hello",
//       body: "World",
//       notification_id: 22,
//     });
//     expect(resp.error).to.equal(true);
//     expect(resp.message).to.equal("Internal error");
//   });

//   it("Failed send email notification due to Email sender", async () => {
//     helperMain.__set__("updateDBNotification", updateDBNotificationMock);
//     helperMain.__set__(
//       "sendEMAILNotification",
//       sendEMAILNotificationMockWithExeception,
//     );
//     const resp = await helperMain.emailNotificationHelper({
//       email: "vikas@tilicho.in",
//       subject: "hello",
//       body: "World",
//       notification_id: 22,
//     });
//     expect(resp.error).to.equal(true);
//     expect(resp.message).to.equal("Internal error");
//   });

//   it("Failed send email notification due to Invalid input", async () => {
//     helperMain.__set__("updateDBNotification", updateDBNotificationMock);
//     helperMain.__set__(
//       "sendEMAILNotification",
//       sendEMAILNotificationMockWithExeception,
//     );
//     const resp = await helperMain.emailNotificationHelper({
//       subject: "hello",
//       body: "World",
//       notification_id: 22,
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
//     expect(resp.error).to.equal(false);
//   });

//   it("Successfully updated notification with failure response", async () => {
//     const resp = await helperMain.updateDBNotification(
//       { error: true, message: "fhvlf" },
//       79,
//     );
//     expect(resp.error).to.equal(false);
//   });

//   it("Invalid params error", async () => {
//     const resp = await helperMain.updateDBNotification();
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
//     expect(resp.error).to.equal(true);
//   });
// });

// describe("Send SMS test suit ", () => {
//   it("Successfully send sms notification with sucess response", async () => {
//     helperMain.__set__("sendEmail", async () => {
//       return {
//         error: false,
//         message: { messageId: "653bdbbdd" },
//       };
//     });
//     const resp = await helperMain.sendEMAILNotification({
//       email: "vikas@tilicho.in",
//       subject: "hello",
//       body: "World",
//     });
//     expect(resp.error).to.equal(false);
//   });
// });


