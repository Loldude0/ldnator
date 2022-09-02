const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'help',
    description: 'help',
    run: async (client, message, content, exists) => {
        const embed = new EmbedBuilder()
            .setColor(0xcc0000)
            .setTitle("commands")
            .addFields(
                {name : "hi", value : "Chat with Dialogpt"},
                {name : "delete", value : "Stop chat with dialogpt"},
                {name : "clear", value : "Clear chat with dialogpt"},
                {name : "help", value : "Help"},
                {name : "ping", value : "Ping"}
            )
            .setTimestamp(new Date());


        message.reply({embeds: [embed]});
    }
}