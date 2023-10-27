const { getUserTokensQuery } = require("./token.query");
const { sequelize, aergov_mobile_tokens } = require("../services/aerpace-ecosystem-backend-db/src/databases/postgresql/models");

exports.getUserTokensFromDB = async (id) => {
    const query = getUserTokensQuery;
    const data = await sequelize.query(query, {
      replacements: { user_id: id},
      type: sequelize.QueryTypes.SELECT,
    });
    return data;
}
 
exports.deleteToken = async (id) => {
    const params = {
      where: {
        id: id
      }
    }
    await aergov_mobile_tokens.destroy(params); 
}

exports.getUserTokens = async (user_id) => {
  try {
    const tokens = await this.getUserTokensFromDB(user_id);
    return tokens;
  } catch (err) {
    return {
      data: undefined,
      error: true,
      message: err,
    };
  }
};