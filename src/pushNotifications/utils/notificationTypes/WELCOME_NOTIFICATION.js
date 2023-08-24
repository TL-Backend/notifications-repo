require("dotenv").config();

const validate = (params) => {
  const { user_id, member_count } = params;
  if (!user_id || !member_count) {
    return {
      error: true,
      message: "UserId and member_count is required",
      code: 400,
    };
  }
  return {
    error: false,
  };
};

const getNotificationPayload = (params) => {
  // eslint-disable-next-line prettier/prettier, import/no-dynamic-require, global-require
  const { WELCOME_NOTIFICATION: messageFn } = require(`../languages/${
    params.lang || "en"
  }`);
  const {
    title, body
  } = messageFn(params);
  return {
    title: title,
    body: body,
    data: {
      user_id: params.user_id
    },
  };
};

const buildNotification = (params) => {
  const validation = validate(params);
  if (validation.error) {
    return validation;
  }
  const notificationPayload = getNotificationPayload(params);
  return {
    type: params.message_type,
    notificationPayload: notificationPayload,
  };
};

module.exports = buildNotification;
