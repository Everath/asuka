import { Message } from 'discord.js'

export class GameService {

    constructor(){
        this.onMessage = this.onMessage.bind(this);
    }

    async onMessage(message: Message) {
        if(message.author.bot) return;

        let currentMessage = message.content;
        await console.log(currentMessage);

        

        
    }

}