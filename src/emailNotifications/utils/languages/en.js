module.exports = {
  WELCOME_NOTIFICATION: (params) => ({
    subject: "Welcome To Aerpace",
    body: `we are thrilled to invite you to the family of {{members_count}} members`,
  }),
  USER_TEMPORARY_PASSWORD: (params) => ({
    subject: `Your Temporary Password: Please Reset Your Account`,
    body: {
      title: `Temporary password`,
      p1: `Hey `,
      p2: `We are thrilled to invite you to family of Aerpace. Below, you will find your temporary password for logging in:`,
      p3: `Please refrain from disclosing your credentials.`,
      thanking: `Thank you for choosing`,
    },
  }),
  USER_PASSWORD_RESET_MESSAGE: (params) => ({
    subject: `Your Temporary Password: Please Reset Your Account`,
    body: {
      title: `Temporary password`,
      p1: `Hey `,
      p2: `You have requested a password reset for your Aerpace account. To proceed, please click the button below: `,
      p3: `If you did not request this, please ignore this email. Your account remains secure. `,
      thanking: `Thank you for choosing`,
      reset_password_button: `Reset Password`
    },
  }),
};
