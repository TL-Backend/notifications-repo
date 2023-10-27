require("dotenv").config();

const validChannels = ["EMAIL_NOTIFICATION"];

const mandatoryParams = {
  content: {
    EMAIL_NOTIFICATION: ["user_name", "reset_password_link"],
  },
  contact_info: {
    EMAIL_NOTIFICATION: ["email"],
  },
};

const validateUserForgotPasswordNotificationInput = (params) => {
  const errorList = [];
  params.channels.forEach((channel) => {
    if (!validChannels.includes(channel)) {
      errorList.push(`Invalid channel name ${channel}`);
      return;
    }
    const hasAllContent = mandatoryParams.content[channel].every((elem) =>
      params.content.hasOwnProperty(elem),
    );
    const hasAllContact = mandatoryParams.contact_info[channel].every((elem) =>
      params.contact_info.hasOwnProperty(elem),
    );
    if (!hasAllContent || !hasAllContact) {
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

module.exports = validateUserForgotPasswordNotificationInput;
