import {Client, TextChannel} from 'discord.js';
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
    if (message.toString() === '!го катать') {
        const textChannel = bot.channels.cache.get(message.channel.id) as TextChannel;
        textChannel.send('в овервощ? @everyone');
    }
});
