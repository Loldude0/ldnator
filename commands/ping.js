module.exports = {
    name: 'ping',
    description: 'Ping!',
    run: async (client, message, content, exists) => {
        message.reply('Pong!');
    }
}