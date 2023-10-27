const temporaryPasswordTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 20px;
        }
        .content {
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            padding: 20px;
            justify-content: center;
        }
        .button {
            display: flex;
            text-decoration: none;
            justify-content: center;
        }
        .reset {
            padding: 10px 20px;
        	background-color: #bd0b0b;
            color: #fff;
        }
        .user-name {
            color: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Aerpace</h1>
        </div>
        <div class="content">
            <p>{p1}<span class="user-name">{user_name}</span>,</p>
            <p>{p2} </p>
            <a class="button" href="{Password Reset Link}"> <p class="reset"> {reset_password_button} </p></a>
            <p>{p3} </p>
            <p>{thanking} Aerpace!</p>
        </div>
    </div>
</body>
</html>
`;

const buildPasswordResetMessage = (params) => {
  const { user_name, reset_password_link } = params.content;
  const {
    USER_PASSWORD_RESET_MESSAGE: userForgotPassword,
  } = require(`../languages/${params.lang || "en"}`);

  const { subject, body } = userForgotPassword(params);
  const { title, p1, p2, p3, thanking, reset_password_button } = body;

  let bodyTemplate = temporaryPasswordTemplate
    .replace("{user_name}", user_name)
    .replace("{Password Reset Link}", reset_password_link)
    .replace("{title}", title)
    .replace("{p1}", p1)
    .replace("{p2}", p2)
    .replace("{p3}", p3)
    .replace("{reset_password_button}", reset_password_button)
    .replace("{thanking}", thanking);

  return {
    body: bodyTemplate,
    subject,
  };
};

module.exports = buildPasswordResetMessage;
