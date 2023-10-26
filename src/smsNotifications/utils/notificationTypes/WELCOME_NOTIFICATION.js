require("dotenv").config();

const replaceTemplateWithDynamicValues = (template, data) => {
  const placeholderRegex = /{{(.*?)}}/g;
  const updatedTemplate = template.replace(
    placeholderRegex,
    (match, key) => data[key.trim()] || "{{failed}}",
  );
  return updatedTemplate;
};

const processTemplate = (message, data) => {
  const messageHasPlaceholders = /{{.*?}}/.test(message);
  let updatedMessage;
  if (messageHasPlaceholders) {
    updatedMessage = replaceTemplateWithDynamicValues(message, data);
  }
  return updatedMessage;
};

const getNotificationPayload = (params) => {
  // eslint-disable-next-line prettier/prettier, import/no-dynamic-require, global-require
  const { WELCOME_NOTIFICATION: messageFn } = require(`../languages/${
    params.lang || "en"
  }`);
  const {
    message
  } = messageFn(params);
  let updatedMessage;
  if (/{{.*?}}/.test(message)) {
    updatedMessage = processTemplate(
      message,
      params.content,
    );
  }
  return {
    message: updatedMessage || message,
  };
};

const buildNotification = (params) => {
  const notificationPayload = getNotificationPayload(params);
  return notificationPayload;
};

module.exports = buildNotification;
