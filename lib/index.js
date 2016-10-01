const Discord = require('discord.js');
const DinoBot = require('./DinoBot');
const phrases = require('./phrases');
const templates = require('./templates');

const client = new Discord.Client();
const dinoBot = new DinoBot({
  phrases,
  templates,
});
const token = process.argv[2];

if (!token || token.length <= 0) {
  throw new Error('no bot token provided');
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (message.isMentioned(client.user)) {
    message.reply(dinoBot.answer(message.cleanContent.replace(/@\w+/g, '').trim()));
  }
});

client.login(token);
