const Discord = require('discord.js');
const DinoBot = require('./DinoBot');
const loadFrameDataJson = require('./loadFrameDataJson');
const phrases = require('./phrases');
const templates = require('./templates');

const client = new Discord.Client();
const token = process.argv[2];

if (!token || token.length <= 0) {
  throw new Error('no bot token provided');
}

loadFrameDataJson('node_modules/tekken-frame-data/ttt2/*.json')
  .then((json) => {
    const dinoBot = new DinoBot({
      phrases,
      templates,
      frameDataJsons: json,
    });

    console.log(`${json.length}  frame data jsons loaded`);

    client.on('ready', () => {
      console.log('I am ready!');
    });

    client.on('message', (message) => {
      if (message.isMentioned(client.user)) {
        message.reply(dinoBot.answer(message.cleanContent));
      }
    });
  });

client.login(token);
