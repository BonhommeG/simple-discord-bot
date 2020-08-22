import {Message, TextChannel} from "discord.js";

export default class Quiz {
    public static commands ={
        '!quiz': (channel: TextChannel, message: Message) => {
            const args = message.toString().split(' ').slice(1);
            if (args[0] === 'help') {
                Quiz.helpCommand(channel, message);
                return;
            }
            Quiz.helpCommand(channel, message);
        }
    };

    private static helpCommand(channel: TextChannel, message: Message) {
        message.reply(`Доступные команды: !quiz <help>.`);
    }
}
