import { Client, Guild } from 'discord.js'

export class UserService {
    client:Client;

    constructor(client:Client) {
        this.client = client;

        this.onReady = this.onReady.bind(this);
        this.onGuildCreate = this.onGuildCreate.bind(this);
        this.onGuildDelete = this.onGuildDelete.bind(this);
    }

    onReady() {
        if (!this.client.user) {
            return
        }
        const userCount = this.client.users.cache.size;
        const channelCount = this.client.channels.cache.size;
        const guildCount = this.client.guilds.cache.size;

        console.log(`Bot has started, with ${userCount} users, in ${channelCount} channels of ${guildCount} guilds.`);
        this.client.user.setActivity(`Serving ${guildCount} servers`);
    }

    onGuildCreate(guild:Guild) {
        if (!this.client.user) {
            return
        }
        const guildCount = this.client.guilds.cache.size;
        const { id, name, memberCount } = guild;

        console.log(`New guild joined: ${name} (id: ${id}). This guild has ${memberCount} members!`);
        this.client.user.setActivity(`Serving ${guildCount} servers`);
    }

    onGuildDelete(guild:Guild) {
        if (!this.client.user) {
            return
        }
        const guildCount = this.client.guilds.cache.size;
        const { id, name } = guild;

        console.log(`I have been removed from: ${name} (id: ${id})`);
        this.client.user.setActivity(`Serving ${guildCount} servers`);
    }
}
