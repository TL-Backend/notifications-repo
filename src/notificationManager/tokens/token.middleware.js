
exports.validateInputForAddToken = (token, user_id) => {
    if(!token || !user_id || user_id === ':user_id'){
        return {
            error: true,
            message: "Token and user_id should be present..."
        }
    }
    return {
        error: false
    }
}