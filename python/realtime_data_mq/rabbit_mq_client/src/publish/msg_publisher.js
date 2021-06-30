
const amqp = require('amqplib/callback_api');
const io = require('socket.io-client');
const c = require('../const/mq_const');
const m = require('../utils/mq_utils');

const socket = io(`${c.SOCKET_HOST}`);
const mq_host = 'amqp://'+c.MQ_HOST;


function publish_message_to_queue(json_msg){
    console.log('publish_message_to_queue....');
    
    amqp.connect(mq_host, function(err , conn ) {
        m.throwError(err, 'Failed to connect Rabbit-mq server !!!!');

        conn.createChannel(function (err , ch ) {
            m.throwError(err, 'Failed to create channel on Rabbit-mq server !!!!');
            // set exchange that is being used
            // ch.assertExchange(process.env.RABBITMQ_WORKER_EXCHANGE, 'direct', {durable: true});
            // set queue that is being used
            const QUEUE = c.QUEUE_NAME;
            ch.assertQueue(QUEUE, {durable: true});
            let str_msg = JSON.stringify(json_msg);
            ch.sendToQueue(QUEUE, Buffer.from(str_msg));
            console.log('message sent to queue: ${QUEUE}');
            });
    });
}

module.exports = {publish_message_to_queue};
