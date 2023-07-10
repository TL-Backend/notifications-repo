const express = require('express');
const app = express();

const { sequelize } = require('./sequelizer/models/index')

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.info('Connected to db');
    } catch (err) {
        console.error('failed to connect to db', err);        
    }
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
    (async () => {
      await connectDb();
      console.log('connected');
      app.listen(3000, () => {
        console.info(`server started running on port 3000`);
      });
    })();
  } catch (err) {
    console.error(`Error in starting the server ${err}`);
  }

exports.module = app;