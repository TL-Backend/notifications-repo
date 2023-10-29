const { addTokenToUser } = require("./token.helper");

exports.addToken = async (req) => {
  try {
    const { user_id } = req.params;
    const { token } = req.body;
    const { code, message } = await addTokenToUser({ user_id, token });
    return {
      code,
      message,
      data: {},
    };
  } catch (error) {
    console.log("Error occurred while building the notifications", error);
    return {
      code: 500,
      message: "Something went wrong.",
      data: {},
    };
  }
};
