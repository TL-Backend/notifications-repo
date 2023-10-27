const temporaryPasswordTemplate = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> AERPACE {title}</title>
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
        .password {
            display: flex;
            text-decoration: none;
            justify-content: center;
        }
        .temp {
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
            <p>{p1} <span class="user-name">{user_name}</span>,</p>
            <p>{p2}</p>
            <div class="password"><p class="temp">{temporary_password}</p></div>
            <p>{p3}</p>
            <p>{thanking} Aerpace!</p>
        </div>
    </div>
</body>
</html>
`;

const buildTemporaryPassword = (params) => {
  const { user_name, temporary_password } = params.content;
  const {
    USER_TEMPORARY_PASSWORD: userTemporaryPassword,
  } = require(`../languages/${params.lang || "en"}`);

  const { subject, body } = userTemporaryPassword(params);
  const { title, p1, p2, p3, thanking } = body;

  let bodyTemplate = temporaryPasswordTemplate
    .replace("{user_name}", user_name)
    .replace("{temporary_password}", temporary_password)
    .replace("{title}", title)
    .replace("{p1}", p1)
    .replace("{p2}", p2)
    .replace("{p3}", p3)
    .replace("{thanking}", thanking);

  return {
    body: bodyTemplate,
    subject,
  };
};

module.exports = buildTemporaryPassword;
