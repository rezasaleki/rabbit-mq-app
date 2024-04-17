const amqp = require('amqplib');

async function send() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from('Hello from RabbitMQ!'));

    console.log("Message sent to the queue");

    await channel.close();
    await connection.close();
}

send().catch(console.error);