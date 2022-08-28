module.exports = {
    name: 'help',
    description: 'help',
    run: async (client, message, content, exists) => {
        message.reply('To initialize a conversation with me, say @LDnator#9779 hi\nTo continue the conversation, ping me every time you want to talk\nConversations will end after 5 minutes, after which you need to invoke hi again\nMore features will be coming soon!');
    }
}