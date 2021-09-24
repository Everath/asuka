import { Message } from 'discord.js'
import config from '../config.json';
import { Ping } from './ping';

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
            const pingHandler = new Ping();
            pingHandler.onPing(message);
        }
    }

}