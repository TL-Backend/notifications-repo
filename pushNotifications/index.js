const { sequelize } = require('./sequelizer/models/index');
const { connectDb, connectToRabbitMQ } = require('./utils/connections')
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
app.disable("x-powered-by");

app.use(express.json());
// let consumerTag = null;

try {
  (async () => {
    await connectDb();
    connectToRabbitMQ();
    app.listen(3000, () => {
      console.info(`server started running on port 3000`);
    });
  })();
} catch (err) {
  console.error(`Error in starting the server ${err}`);
}