const { getUserById } = require("./token.query");
const { sequelize, aergov_mobile_tokens } = require("../services/aerpace-ecosystem-backend-db/src/databases/postgresql/models");
const { validateInputForAddToken } = require("./token.middleware");

exports.getUserDetails = async (id) => {
    const query = getUserById;
    const data = await sequelize.query(query, {
      replacements: { user_id: id},
      type: sequelize.QueryTypes.SELECT,
    });
    if (data[0].id === undefined) {
        return {
            error: true,
            message: 'Invalid user_id'
        }
    }
    return {
        error: false
    }
}
 
exports.addTokenInDatabase = async (token, user_id) => {
    const params = {
        user_id,
        token
      };
      await aergov_mobile_tokens.create(params); 
}

exports.addTokenToUser = async (token, user_id) => {
  try {
    const validate = validateInputForAddToken(token, user_id)
    console.log("user_id",user_id);
    if(validate.error){
      return {
        error: true,
        code: 400,
        message: validate.message
      }
    }
    const user = await this.getUserDetails(user_id);
    if(user.error){
        return {
          data: {},
          code: 400,
          message: user.message
        }
    }
    await this.addTokenInDatabase(token, user_id);
    return {
        data: {},
        code: 200,
        message: "Token added successfully" 
    }
  } catch (err) {
    return {
      data: undefined,
      error: true,
      message: err,
    };
  }
};
