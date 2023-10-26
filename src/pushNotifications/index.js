const { connectDb, connectToRabbitMQ } = require("./utils/connections");
const express = require("express");
const app = express();

app.disable("x-powered-by");
app.use(express.json());

const environment = process.env.NODE_ENV || "development";
const envFilePath = `config/${environment}.env`;
require("dotenv").config({ path: envFilePath });

const port = process.env.PORT || 6002;

const connectDbPromise = () => {
  return new Promise((resolve, reject) => {
    connectDb((err, data) => {
      if (err) {
        console.error("DB Connction error:", err);
        reject({
          error: true,
          message: err,
        });
      } else {
        console.log("Database connected", data);
        resolve({
          error: false,
          message: data,
        });
      }
    });
  });
};

const connectToRabbitMQPromise = () => {
  return new Promise((resolve, reject) => {
    connectToRabbitMQ((err, data) => {
      if (err) {
        console.error("RabbitMq Connction error:", err);
        reject({
          error: true,
          message: err,
        });
      } else {
        console.log("RabbitMQ connected", data);
        resolve({
          error: false,
          message: data,
        });
      }
    });
  });
};

try {
  (() => {
    const dbConnect = connectDbPromise();
    if (dbConnect.error) {
      throw new Error();
    }
    const rabbitMq = connectToRabbitMQPromise();
    if (rabbitMq.error) {
      throw new Error();
    }
    app.listen(port, () => {
      console.info(`server started running on port ${port}`);
    });
  })();
} catch (err) {
  console.error(`Error in starting the server ${err}`);
}
