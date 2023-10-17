//const response = await sendChannelBasedNotification(req.body, channel)
const { sendChannelBasedNotification } = require('./helper')


const notificationManager = async ( inputPayload, channel ) => {
    /**
     *    {
     *         notificationType: "",
     *         params: {
     *              
     *          }
     *          
     *      }
     */

    try {
       const resp = await sendChannelBasedNotification(inputPayload.channels, channel)

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

module.exports = notificationManager