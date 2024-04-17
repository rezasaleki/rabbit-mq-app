const amqp = require('amqplib');

async function receive() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue);

    console.log("Waiting for messages...");

    await channel.consume(queue, (message) => {
        console.log("Received message:", message.content.toString());
    }, {
        noAck: true
    });
}

receive().catch(console.error);
