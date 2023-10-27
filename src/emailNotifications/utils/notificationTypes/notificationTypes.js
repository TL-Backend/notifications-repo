const buildPasswordResetMessage = require("./USER_PASSWORD_RESET_MESSAGE");
const buildTemporaryPassword = require("./USER_TEMPORARY_PASSWORD.JS");
const welcomeUserBuildNotification = require("./WELCOME_NOTIFICATION");

const notificationTypes = {
  WELCOME_NOTIFICATION: welcomeUserBuildNotification,
  USER_TEMPORARY_PASSWORD: buildTemporaryPassword,
  USER_PASSWORD_RESET_MESSAGE: buildPasswordResetMessage
};

module.exports = {
  notificationTypes,
};
