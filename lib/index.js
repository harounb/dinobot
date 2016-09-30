const Discord = require('discord.js');
const client = new Discord.Client();
const DinoBot = require('./DinoBot');
const dinoBot = new DinoBot();
const token = process.argv[2];

if (!token || token.length <= 0) {
  throw new Error('no bot token provided');
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.isMentioned(client.user)) {
    message.reply(dinoBot.answer(message.contents));
  }
});

client.login(token);
