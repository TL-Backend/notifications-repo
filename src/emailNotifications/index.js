const { sequelize } = require('./sequelizer/models/index');
const { connectDb, connectToRabbitMQ } = require('./utils/connections')
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
// let consumerTag = null;
app.disable("x-powered-by");

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
    app.listen(3005, () => {
      console.info(`server started running on port 3000`);
    });
  })();
} catch (err) {
  console.error(`Error in starting the server ${err}`);
}