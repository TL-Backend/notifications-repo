
const { connectToRabbitMQ, connectDb } = require('./config/connections');
const express = require('express');
const app = express();
const notificationManager = require('./notificationManager');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");

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
const connectDbPromise = () => {
  return new Promise((resolve, reject) => {
    connectDb((err, data) => {
      if (err) {
        console.error('DB Connction error:', err);
        reject({
          error: true,
          message: err
        });
      } else {
        console.log('Database connected', data);
        resolve({
          error: false,
          message: data
        });
      }
    });
  });
}

const connectToRabbitMQPromise = () => {
  return new Promise((resolve, reject) => {
    connectToRabbitMQ((err, data) => {
      if (err) {
        console.error('RabbitMq Connction error:', err);
        reject({
          error: true,
          message: err
        });
      } else {
        console.log('RabbitMQ connected', data);
        resolve({
          error: false,
          message: data
        });
      }
    });
  });
}

try {
  ( () => {
    const dbConnect = connectDbPromise();
    if(dbConnect.error){
      throw new Error();
    }
    const rabbitMq = connectToRabbitMQPromise();
    if(rabbitMq.error){
      throw new Error();
    }
    app.listen(3006, () => {
      console.info(`server started running on port 3000`);
    });
  })();
} catch (err) {
  console.error(`Error in starting the server ${err}`);
}
exports.module = app;