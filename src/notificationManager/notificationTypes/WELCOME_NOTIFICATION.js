require("dotenv").config();

const validChannels = [
  "SMS_NOTIFICATION",
  "PUSH_NOTIFICATION",
  "EMAIL_NOTIFICATION",
];

const mandatoryParams = {
  content: {
    EMAIL_NOTIFICATION: ["user_name"],
  },
  contact_info: {
    SMS_NOTIFICATION: ["mobile"],
    PUSH_NOTIFICATION: [],
    EMAIL_NOTIFICATION: ["email"],
  },
};

const validateNotificationInput = (params) => {
  const errorList = [];
  params.channels.forEach((channel) => {
    if (!validChannels.includes(channel)) {
      errorList.push(`Invalid channel name ${channel}`);
      return;
    }

    const hasAllContact = mandatoryParams.contact_info[channel].every((elem) =>
      params.contact_info.hasOwnProperty(elem),
    );
    if (!hasAllContact) {
      errorList.push(`Missing required data for ${channel}`);
      return;
    }
  });
  if (errorList.length) {
    return {
      error: true,
      message: errorList.join(", "),
    };
  }
  return {
    error: false,
    message: "Valid Input",
  };
};

module.exports = validateNotificationInput;
