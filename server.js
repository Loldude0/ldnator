const fs = require('fs');
const path = require('path');

const { Client, Collection, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();

require('dotenv').config()
const filter = require('./filter');
const getUsername = require('./getUsername');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

console.log("10:52:00 1/9/2022");

inConversation = [];

client.once('ready', () => {
    console.log('running');
    client.user.setActivity('PING ME AND SAY HELP!', { type: ActivityType.Playing });
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id && message.content.indexOf("<@972716081837932574>") > -1) {

        content = filter(message.content);

        author = message.author.username + "#" + message.author.discriminator;

        var getList = await fetch('http://localhost:3000/huggingfacelist');
        var result = await getList.json();
        var exists = getUsername(result.listToReturn, author);
        const command = client.commands.get(content.substring(0, content.indexOf(" ")));
        if (command || exists) {
            if(exists == true){
                try{
                    if(content.indexOf("clear") > -1){
                        await client.commands.get('clear').run(client, message, content, exists);
                    } else if(content.indexOf("delete") > -1){
                        await client.commands.get('delete').run(client, message, content, exists);
                    } else {
                        await client.commands.get('hi').run(client, message, content, exists);
                    }
                } catch {
                    await message.channel.send(`Somehow, my inner workings have grinded to a halt`);
                }
            } else {
                try {
                    await command.run(client, message, content, exists);
                } catch (error) {
                    console.log(error);
                    await message.channel.send(`Somehow, my inner workings have grinded to a halt`);
                }
            }
        }
    }
});

client.on('guildCreate', (guild) => {
    console.log("got invited to " + guild.name);
    let channel;
    guild.channels.cache.forEach((channel) => {
        if(
            channel.type == "text" &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        )
        channel = channel;
    });

    if(!channel) return;

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
    
    channel.send({embeds: [embed]});

})

client.login(process.env.TOKEN);