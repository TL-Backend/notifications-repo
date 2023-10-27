const { addTokenToUser } = require("./token.helper");


exports.addToken = async ( req ) => {
    try {
        const resp = await addTokenToUser(req.body.token, req.params.user_id);
        return resp;
    } catch (error) {
        
        console.log("Error occured while builing the notificaiton", error)
        return {
            success:false,
            data: null,
            error: {
                message:"Internal Server Error",
            }
        }
    }
}