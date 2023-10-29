const { getUserById } = require("./token.query");
const {
  sequelize,
  aergov_mobile_tokens,
} = require("../services/aerpace-ecosystem-backend-db/src/databases/postgresql/models");
const { validateInputForAddToken } = require("./token.middleware");

exports.getUserDetails = async (id) => {
  const query = getUserById;

  const data = await sequelize.query(query, {
    replacements: { user_id: id },
    type: sequelize.QueryTypes.SELECT,
  });

  if (!data.length || data[0]?.id == "undefined") {
    return {
      error: true,
      message: "Invalid user_id",
      code: 400,
    };
  }

  return {
    error: false,
    message: "success",
    code: 200,
  };
};

exports.addTokenInDatabase = async (token, user_id) => {
  await aergov_mobile_tokens.create({ token, user_id });
};

exports.addTokenToUser = async ({token, user_id}) => {
  try {
    const { error, code, message } = validateInputForAddToken(token, user_id);
    console.log("user_id", user_id);
    if (error) {
      return {
        data: {},
        code,
        message: message,
      };
    }

    const {
      code: userDetailsStatus,
      error: isValidUser,
      message: userDetailsStatusMessage,
    } = await this.getUserDetails(user_id);
    if (isValidUser) {
      return {
        data: {},
        code: userDetailsStatus,
        message: userDetailsStatusMessage,
      };
    }

    await this.addTokenInDatabase(token, user_id);
    return {
      data: {},
      code: 200,
      message: "Token added successfully.",
    };
  } catch (err) {
    return {
      data: {},
      code: 500,
      message: "Something went wrong.",
    };
  }
};
