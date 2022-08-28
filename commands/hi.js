module.exports = {
    name: 'hi',
    description: 'Chat with Dialogpt',
    run: async (client, message, content, exists) => {

        user = message.author.username + "#" + message.author.discriminator;
        content2 = content;

        if (exists == true) {

            var data = {
                "username" : user,
                "user_input" : content2
            };
            var getResponse = await fetch(
                'http://localhost:3000/huggingface',
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

            var temp = "hi my name is " + message.author.username.toLowerCase();
            var data = {
                "username" : user,
                "user_input" : temp
            };
            var getResponse = await fetch(
                'http://localhost:3000/huggingface',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify(data),
                }
                );
            var result = await getResponse.json();
            message.reply(result.result + "** **");

        }
    }
}