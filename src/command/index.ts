import { Message } from 'discord.js'
import config from '../config.json';

export class CommandService {

    constructor(){
        this.onMessage = this.onMessage.bind(this);
    }

    async onMessage(message: Message) {
        if(message.author.bot) return;
        if(!message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift()!.toLowerCase();

        if(command === "ping") {
            const m = await message.channel.send("Ping?");
            m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
        }


    }

}