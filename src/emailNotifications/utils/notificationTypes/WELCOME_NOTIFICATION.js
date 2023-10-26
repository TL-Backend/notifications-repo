require("dotenv").config();

const replaceTemplateWithDynamicValues = (template, data) => {
  const placeholderRegex = /{{(.*?)}}/g;
  const updatedTemplate = template.replace(
    placeholderRegex,
    (match, key) => data[key.trim()] || "{{failed}}",
  );
  return updatedTemplate;
};

const processTemplate = (body, data) => {
  const bodyHasPlaceholders = /{{.*?}}/.test(body);
  let updatedBody;
  if (bodyHasPlaceholders) {
    updatedBody = replaceTemplateWithDynamicValues(body, data);
  }
  return { updatedBody };
};

const getNotificationPayload = (params) => {
  // eslint-disable-next-line prettier/prettier, import/no-dynamic-require, global-require
  const { WELCOME_NOTIFICATION: messageFn } = require(`../languages/${
    params.lang || "en"
  }`);
  const {
    subject, body
  } = messageFn(params);
  let updatedBody;
  if (/{{.*?}}/.test(body)) {
    ({ updatedBody } = processTemplate(
      body,
      params.content,
    ));
  }
  return {
    subject: subject,
    body: updatedBody || body,
  };
};

const buildNotification = (params) => {
  const notificationPayload = getNotificationPayload(params);
  return notificationPayload;
};

module.exports = buildNotification;
