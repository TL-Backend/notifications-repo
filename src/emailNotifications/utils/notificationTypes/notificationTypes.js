const buildPasswordResetMessage = require("./USER_PASSWORD_RESET_MESSAGE");
const buildTemporaryPassword = require("./USER_TEMPORARY_PASSWORD.JS");
const buildWelcomeNotification = require("./WELCOME_NOTIFICATION");

const notificationTypes = {
  WELCOME_NOTIFICATION: buildWelcomeNotification,
  USER_TEMPORARY_PASSWORD: buildTemporaryPassword,
  USER_PASSWORD_RESET_MESSAGE: buildPasswordResetMessage
};

module.exports = {
  notificationTypes,
};
