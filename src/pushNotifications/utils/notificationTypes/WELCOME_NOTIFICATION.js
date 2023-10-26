require("dotenv").config();

const replaceTemplateWithDynamicValues = (template, data) => {
  const placeholderRegex = /{{(.*?)}}/g;
  const updatedTemplate = template.replace(
    placeholderRegex,
    (match, key) => data[key.trim()] || "{{failed}}",
  );
  return updatedTemplate;
};

const processTemplate = (title, body, data) => {
  const titleHasPlaceholders = /{{.*?}}/.test(title);
  const bodyHasPlaceholders = /{{.*?}}/.test(body);
  let updatedTitle;
  let updatedBody;
  if (titleHasPlaceholders) {
    updatedTitle = replaceTemplateWithDynamicValues(title, data);
  }
  if (bodyHasPlaceholders) {
    updatedBody = replaceTemplateWithDynamicValues(body, data);
  }
  return { updatedTitle, updatedBody };
};

const getNotificationPayload = (params) => {
  // eslint-disable-next-line prettier/prettier, import/no-dynamic-require, global-require
  const { WELCOME_NOTIFICATION: messageFn } = require(`../languages/${
    params.lang || "en"
  }`);
  const {
    title, body
  } = messageFn(params);
  let updatedTitle;
  let updatedBody;
  if (/{{.*?}}/.test(title) || /{{.*?}}/.test(body)) {
    ({ updatedTitle, updatedBody } = processTemplate(
      title,
      body,
      params.content,
    ));
  }
  return {
    title: updatedTitle || title,
    body: updatedBody || body,
    data: {
      user_id: params.user_id
    },
  };
};

const buildNotification = (params) => {
  const notificationPayload = getNotificationPayload(params);
  return notificationPayload;
};

module.exports = buildNotification;
