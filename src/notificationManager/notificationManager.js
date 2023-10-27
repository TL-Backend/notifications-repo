//const response = await sendChannelBasedNotification(req.body, channel)
const { sendChannelBasedNotification } = require("./helper");

const notificationManager = async (notificationPayload, channel) => {
  try {
    const resp = await sendChannelBasedNotification(
      notificationPayload,
      channel,
    );
    return resp;
  } catch (error) {
    console.log("Error occurred while bailing the notification", error);
    return {
      code: 500,
      data: {},
      error: {
        message: "Internal Server Error",
      },
    };
  }
};

module.exports = notificationManager;
