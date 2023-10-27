const USER_TABLE = 'aergov_users'

exports.getUserById = `SELECT id
  FROM ${USER_TABLE}
  WHERE id = :user_id
  `;