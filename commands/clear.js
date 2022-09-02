module.exports = {
    name: 'clear',
    description: 'clears the chat with dialogpt',
    run: async (client, message, content, exists) => {

        user = message.author.username + "#" + message.author.discriminator;

        if (exists == true) {

            var data = {
                "username" : user,
            };
            var getResponse = await fetch(
                'http://localhost:3000/huggingfaceremove',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
                );
            var result = await getResponse.json();
            message.reply(result.result + "** **");

        } else {

            message.reply("You must be in a conversation you fool");

        }
    }
}