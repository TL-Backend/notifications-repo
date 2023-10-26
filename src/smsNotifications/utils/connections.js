const amqp = require("amqplib");
const exchange_name = "notification-exchange";
const exchange_type = "direct";
const binding_key = "SMS_NOTIFICATION";
const queue_name = "sms-notifications-queue";
const { smsNotificationHelper } = require("../helper");

const {
  sequelize,
} = require("../services/aerpace-ecosystem-backend-db/src/databases/postgresql/models/index");

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.info("Connected to db");
  } catch (err) {
    console.error("failed to connect to db", err);
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
        smsNotificationHelper(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connectToRabbitMQ,
  connectDb,
};
