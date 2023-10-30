const buildWelcomeNotification = (params) => {
  const { user_name } = params.content;
  const {
    WELCOME_NOTIFICATION: WelcomeNotification,
  } = require(`../languages/${params.lang || "en"}`);

  const { subject, body } = WelcomeNotification(params);
  console.log(subject);

  let bodyTemplate = body.replace("{user_name}", user_name);

  return {
    body: bodyTemplate,
    subject,
  };
};

module.exports = buildWelcomeNotification;
