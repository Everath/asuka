import { Message  } from "discord.js";
import { CommandService, Command } from './commandService';

type CommandDescription = {
    name: string;
    description: string;
    category: string;
    example: string;
};

type GroupedCommands = {
    [category: string]: CommandDescription[];
};

export class HelpCommand implements Command {
    private static commands: CommandDescription[] = [];

    public static addHelpInstructions(commandDescription: CommandDescription) {
        HelpCommand.commands.push(commandDescription);
    }

    public async execute(args: string[], message: Message) {
        if(args.length > 0) {
            await this.explainCommand(args[0], message);
        } else {
            await this.listCommands(message);
        }
    }

    public async explainCommand(command: string, message: Message) {
        if(command === "help") {
            await message.channel.send(`Are you stupid, B-Baka!`);
           return;
        }

        const foundCommand = HelpCommand.commands.find((commandDescription) => 
            commandDescription.name === command
        );

        if(!foundCommand) {
           await message.channel.send(`Could not find command: **${command}**, try with another one.`);
           return;
        }

        await message.channel.send(`Command: **${foundCommand.name}** \t ${foundCommand.description}`);
    }

    public async listCommands(message: Message) {
        const groupByCategory = (acc: GroupedCommands, item: CommandDescription) => {
            const category = acc[item.category] || [];
            category.push(item);
            acc[item.category] = category;
            return acc;
        };
        const commandByCategory = HelpCommand.commands.reduce(groupByCategory, {});
        
        const commandList = Object.entries(commandByCategory).map(([category, commands]) => {
            const commandDescriptions = commands.map(({name, description}) => `\t ${name} \t ${description}`);
            return `${category} \n ${commandDescriptions.join('\n')}`;
        }).join('\n\n');
        
        await message.channel.send(`**Commands for Asuka:** \n${commandList}`);
    }
}

HelpCommand.addHelpInstructions({
    name: 'help',
    description: 'Help for command, or list all commands.',
    category: 'Misc',
    example: 'ad!help <command>'
});

CommandService.registerCommand({
    name: 'help',
    factory: () => new HelpCommand(),
});
