const buildPasswordResetMessage = (params) => {
  const { user_name, reset_password_link } = params.content;
  const {
    USER_PASSWORD_RESET_MESSAGE: userForgotPassword,
  } = require(`../languages/${params.lang || "en"}`);

  const { subject, body } = userForgotPassword(params);

  let bodyTemplate = body
    .replace("{user_name}", user_name)
    .replace("{reset_password_link}", reset_password_link);

  return {
    body: bodyTemplate,
    subject,
  };
};

module.exports = buildPasswordResetMessage;
