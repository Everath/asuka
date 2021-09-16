import { Client, Intents } from 'discord.js';
import { UserService } from './user';
import { CommandService } from './command';
import config from './config.json';

const client = new Client<true>({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const userService = new UserService(client);
const commandService = new CommandService();


client.on("ready", userService.onReady);
client.on("guildCreate", userService.onGuildCreate);
client.on("guildDelete", userService.onGuildDelete);
client.on("message", commandService.onMessage);
/*client.on("message", async message => {
    if(message.author.bot) return;
    await message.channel.send("B-Baka!");
});*/
client.login(config.token);