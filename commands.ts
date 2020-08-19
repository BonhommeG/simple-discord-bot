import {Message, TextChannel} from 'discord.js';

export default {
    '!го': function (channel: TextChannel, message: Message) {
        const goodGames: string[] = [
            'овервощ', 'арех', 'пираты', 'своя игра'
        ]
        const game = message.toString().slice(4);
        if (game.length === 0) {
            const help = 'Команда !го <название игры>\n' +
                `Доступные игры: ${goodGames.join(', ')}.`;
            message.reply(help);
            return;
        }
        if (!goodGames.includes(game)) {
            message.reply('не знаю такой игры');
            return;
        }
        channel.send(`@everyone, тут ${message.author} зовёт в ${game}, го?`);
    }
}
