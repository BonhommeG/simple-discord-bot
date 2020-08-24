import {Client, TextChannel} from 'discord.js';
import helpers from './helpers';
import commands from './commands';
import config = require('./config.json');
import Quiz from "./games/quiz";

const bot = new Client();
bot.login(config.token);

bot.on('voiceStateUpdate', (oldState, newState) => {
    const userName = newState.member.displayName;
    const notificationChannel = newState.guild.channels.cache.find(channel => channel.name === config.notificationChannel) as TextChannel;

    if ((oldState.channelID !== newState.channelID) && newState.channel) {
        const channelName = newState.channel.name;
        notificationChannel.send(`${userName} зашёл в войс-чат (${channelName}).`);
    }
});

bot.on('message', (message) => {
    if (!config.watchTextChannels.includes((message.channel as TextChannel).name)) {
        return;
    }

    const command = helpers.getCommandFromString(message.toString());
    if (command) {
        const cmdFunction = commands[command];
        if (cmdFunction) {
            cmdFunction.call(commands, message.channel, message);
            return;
        }

        // todo сделать норм подгрузку команд из модулей
        const quizCommandFunction = Quiz.commands[command];
        if (quizCommandFunction) {
            quizCommandFunction.call(Quiz.commands, message.channel, message);
            return;
        }

        message.reply('неизвестная команда.');
    }
});
