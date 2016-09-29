const Discord = require('discord.js');
const client = new Discord.Client();
const DinoBot = require('./DinoBot');
const dinoBot = new DinoBot();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => (dinoBot.ask(message)));

client.login(token);
