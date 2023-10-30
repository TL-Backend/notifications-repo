const buildTemporaryPassword = (params) => {
  const { user_name, temporary_password } = params.content;
  const {
    USER_TEMPORARY_PASSWORD: userTemporaryPassword,
  } = require(`../languages/${params.lang || "en"}`);

  const { subject, body } = userTemporaryPassword(params);
  console.log(subject);

  let bodyTemplate = body
    .replace("{user_name}", user_name)
    .replace("{temporary_password}", temporary_password);

  return {
    body: bodyTemplate,
    subject,
  };
};

module.exports = buildTemporaryPassword;
