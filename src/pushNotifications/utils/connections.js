const amqp = require("amqplib");
const exchange_name = "notification-exchange";
const exchange_type = "direct";
const binding_key = "PUSH_NOTIFICATION";
const queue_name = "push-notifications-queue";
const { pushNotificationHelper } = require("../helper");

const { sequelize } = require("../sequelizer/models/index");

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.info("Connected to db");
    return {
      code: 200,
      message: "Connected to db",
      error: false,
    };
  } catch (err) {
    console.error("failed to connect to db", err);
    return {
      code: 401,
      message: err,
      error: true,
    };
  }
};

async function connectToRabbitMQ() {
  try {
    let connection = await amqp.connect("amqp://localhost:5672");
    let channel = await connection.createChannel();
    console.log("RabbitMQ connected");
    await channel.assertExchange(exchange_name, exchange_type, {
      durable: true,
    });
    const q = await channel.assertQueue(queue_name, { exclusive: true });
    // binding the queue
    channel.bindQueue(q.queue, exchange_name, binding_key);
    console.log("consuming messages from queue: ", q.queue);
    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        console.log("Received message: ", msg.content.toString());
        pushNotificationHelper(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }
    });
    return {
      code: 200,
      message: "Connected to RabbitMQ server",
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 401,
      message: err,
      error: true,
    };
  }
}
const testFunction = async () => {
  try {
    console.info("Connected to db");
  } catch (err) {
    console.error("failed to connect to db", err);
  }
};

module.exports = {
  connectToRabbitMQ,
  connectDb,
  testFunction,
};
