import { Message } from 'discord.js';

export interface Command {
    execute:(args: string[], message: Message) => Promise<void>;
}

type CommandRegistration = {
    name: string;
    factory: () => Command;
};

export class CommandService {
    private static commands: CommandRegistration[] = [];

    public static registerCommand(registration: CommandRegistration) {
        CommandService.commands.push(registration);
    }

    private prefix:string;

    constructor(prefix:string){
        this.prefix = prefix;
        this.onMessage = this.onMessage.bind(this);
    }

    async onMessage(message: Message) {
        if(message.author.bot) return;
        if(!message.content.startsWith(this.prefix)) return;

        const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
        const commandName = args.shift()!.toLowerCase();
        
        const foundCommand = CommandService.commands.find((commandRegistration) => 
            commandRegistration.name === commandName
        );

        if(!foundCommand) {
           await message.channel.send(`Could not find command: **${commandName}**, try using ${this.prefix}help.`);
           return;
        }

        const command = foundCommand.factory();
        await command.execute(args, message);
    }
}