const TOKEN_TABLE = 'aergov_mobile_tokens'


exports.getUserTokensQuery = `SELECT id, token
  FROM ${TOKEN_TABLE}
  WHERE user_id = :user_id
  `;