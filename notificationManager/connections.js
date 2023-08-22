
const amqp = require("amqplib");

const { sequelize } = require('./sequelizer/models/index');

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.info('Connected to db');
        return{
            code: 200,
            message: "Connected to db",
            error: false
        }
    } catch (err) {
        console.error('failed to connect to db', err);        
        return{
            code: 401,
            message: err,
            error: true
        } 
    }
}

async function connectToRabbitMQ() {
    try{
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        console.log("RabbitMQ connected...")
        return {
            code: 200,
            data: channel,
            error: false
        }
    }catch(err){
        console.log("Error",err);
        return{
            code: 401,
            message: err,
            error: true
        } 
    }
}

module.exports = {
    connectToRabbitMQ,
    connectDb
}
