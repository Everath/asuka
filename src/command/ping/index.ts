import { Message } from 'discord.js';

export class Ping{

    constructor() {
        this.onPing = this.onPing.bind(this);
    }

    async onPing(message: Message) {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}