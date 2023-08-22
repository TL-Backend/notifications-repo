
const { connectDb } = require('./config/connections');
const { connectToRabbitMQ } = require('./config/connections');
const express = require('express');
const app = express();
const notificationManager = require('./notificationManager');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let channel;

app.post("/", async(req, res) => {
    try{
      console.log("res body", req.body)
      const response = await notificationManager(req.body.data, channel.data)
      res.status(200).send(response);
    }catch(err){
      res.send(err);
      console.error(err)
    }
})

try {
    (async () => {
      channel = await connectToRabbitMQ();
      if(channel.error){
        throw new Error(channel.message)
      }
      const DbConnect = await connectDb();
      if(DbConnect.error){
        throw new Error(DbConnect.message)
      }
      app.listen(4000, () => {
        console.info(`server started running on port 4000`);
      });
    })();
  } catch (err) {
    console.error(`Error in starting the server ${err}`);
  }

exports.module = app;