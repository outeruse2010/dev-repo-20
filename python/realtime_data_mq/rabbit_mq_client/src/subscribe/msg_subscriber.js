
const amqp = require('amqplib/callback_api');
const io = require('socket.io-client');
const c = require('../const/mq_const');
const u = require('../utils/mq_utils');

const socket = io(`${c.SOCKET_HOST}`);
const mq_host = 'amqp://'+c.MQ_HOST;

// console.log('socket connected: ',socket);
let socket_connected = false;
socket.on("connect", () => {
    socket_connected = socket.connected;
    console.log('socket connected: ',socket_connected); 
  });

amqp.connect(mq_host, function(err , conn ) {
    u.throwError(err, 'Failed to connect Rabbit-mq server !!!!');
    conn.createChannel(function (err , ch ) {
        u.throwError(err, 'Failed to create channel on Rabbit-mq server !!!!');
        // set exchange that is being used
        // ch.assertExchange(process.env.RABBITMQ_WORKER_EXCHANGE, 'direct', {durable: true});
        // set queue that is being used
        const QUEUE = c.QUEUE_NAME;
        ch.assertQueue(QUEUE, {durable: true}, function (err , q ) {
            u.throwError(err, 'Failed to create Queue: '+QUEUE+' on Rabbit-mq server !!!!');
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            // bind the queue to the exchange
            // ch.bindQueue(q.queue, process.env.RABBITMQ_WORKER_EXCHANGE, '');
            // consume from the queue, one message at a time.
            let delivered = false;

            ch.consume(q.queue, function (msg ) {
                console.log("Message received: %s", msg.content);
                const content = JSON.parse(msg.content.toString());
                console.log("Message type: ",typeof(content),', content: ',content);
                
                // const content =  {
                //     'user_email': 'abc@example.com',
                //     'product': 'Leather Jacket',
                //     'quantity': 1
                // }

                if (!socket_connected) {
                    u.throwError('Please check web-socket server!!!!', 'Failed to connect web-socket server !!!!');
                }
               socket.emit('q_json_data', content);
            }, 
            {noAck: true});
        });
    });
});

