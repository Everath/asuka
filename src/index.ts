import { Client, Intents } from 'discord.js';
import { UserService } from './user';
import { GameService } from './game';
import config from './config.json';

const client = new Client<true>({ intents: [Intents.FLAGS.GUILDS] });

const userService = new UserService(client);
//const gameService = new GameService();


client.on("ready", userService.onReady);
client.on("guildCreate", userService.onGuildCreate);
client.on("guildDelete", userService.onGuildDelete);
//client.on("message", gameService.onMessage);
client.login(config.token);