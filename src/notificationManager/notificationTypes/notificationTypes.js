const validateUserForgotPasswordNotificationInput = require("./USER_PASSWORD_RESET_MESSAGE");
const validateUserTemporaryPasswordNotificationInput = require("./USER_TEMPORARY_PASSWORD.JS");
const welcomeUserBuildNotification = require("./WELCOME_NOTIFICATION");

const notificationTypes = {
  WELCOME_NOTIFICATION: welcomeUserBuildNotification,
  USER_TEMPORARY_PASSWORD: validateUserTemporaryPasswordNotificationInput,
  USER_PASSWORD_RESET_MESSAGE: validateUserForgotPasswordNotificationInput
};

module.exports = {
  notificationTypes,
};
