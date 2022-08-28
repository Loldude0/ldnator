const fs = require('fs');
const path = require('path');

const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
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
                    await client.commands.get('hi').run(client, message, content, exists);
                } catch {
                    await message.channel.send(`Something went wrong on my side!`);
                }
            } else {
                try {
                    await command.run(client, message, content, exists);
                } catch (error) {
                    console.log(error);
                    await message.channel.send(`Something went wrong on my side!`);
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

    channel.send("Thanks for inviting me!");
    channel.send('To initialize a conversation with me, say @LDnator#9779 hi\nTo continue the conversation, ping me every time you want to talk\nConversations will end after 5 minutes, after which you need to invoke hi again\nMore features will be coming soon!');
    channel.send('To get a list of commands, say @LDnator#9779 help');

})

client.login(process.env.TOKEN);