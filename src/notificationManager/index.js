
const { connectToRabbitMQ, connectDb } = require('./config/connections');
const express = require('express');
const app = express();
const notificationManager = require('./notificationManager');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");

const environment = process.env.NODE_ENV || 'development';
const envFilePath = `config/${environment}.env`;
require('dotenv').config({ path: envFilePath });

let channel;
const port = process.env.PORT || 3000

app.post("/", async(req, res) => {
    try{
      console.log("res body", req.body)
      const response = await notificationManager(req.body, channel)
      res.status(200).send(response);
    }catch(err){
      res.send(err);
      console.error(err)
    }
})


try {
  ( async() => {
    const dbConnect = await connectDb();
    if(dbConnect.error){
      throw new Error();
    }
    const rabbitMq = await connectToRabbitMQ();
    if(rabbitMq.error){
      throw new Error();
    }
    channel = rabbitMq.data
    app.listen(port, () => {
      console.info(`server started running on port ${port}`);
    });
  })();
} catch (err) {
  console.error(`Error in starting the server ${err}`);
}
exports.module = app;