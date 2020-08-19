import {Client, TextChannel} from 'discord.js';
import helpers from './helpers';
import commands from './commands';
import config = require('./config.json');

const bot = new Client();
bot.login(config.token);

bot.on('voiceStateUpdate', (oldState, newState) => {
    const userName = newState.member.displayName;
    const textChannel = newState.guild.channels.cache.find(channel => channel.name === 'text') as TextChannel;

    if ((oldState.channelID !== newState.channelID) && newState.channel) {
        const channelName = newState.channel.name;
        textChannel.send(`${userName} зашёл в войс-чат (${channelName}).`);
    }
});

bot.on('message', (message) => {
    const content = message.toString();
    const command = helpers.getCommandFromString(content);
    if (command) {
        const cmdFunction = commands[command];
        if (!cmdFunction) {
            message.reply('неизвестная команда.');
            return;
        }
        cmdFunction.call(commands, message.channel, message);
    }
});
