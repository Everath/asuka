import { Message } from 'discord.js';
import { HelpCommand } from './help';
import { CommandService, Command } from './commandService';

class PingCommand implements Command {

    constructor() {
        // Removed, but keeping in comment to research later.
        // this.doPing = this.doPing.bind(this);
    }

    public async execute(args: string[], message: Message) {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}

HelpCommand.addHelpInstructions({
    name: 'ping',
    description: 'Your ping with the bot.',
    category: 'Misc',
    example: 'ad!ping',
});

CommandService.registerCommand({
    name: 'ping',
    factory: () => new PingCommand(),
});

export { PingCommand };