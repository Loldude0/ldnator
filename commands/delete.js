module.exports = {
    name: 'delete',
    description: 'flags for deletion in dialogpt',
    run: async (client, message, content, exists) => {

        user = message.author.username + "#" + message.author.discriminator;

        if (exists == true) {

            var data = {
                "username" : user,
            };
            var getResponse = await fetch(
                'http://localhost:3000/huggingfacedelete',
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

            message.reply("you absolute baboon, you're already deleted or you didn't say hi");

        }
    }
}