import {IGuildConfig} from './src/database/models/GuildConfig'

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, any>;
    categories: Set<string>;
    aliases: Collection<string, string>;
    cooldowns: Collection<string, number>;
    guildConfigs: Collection<string, IGuildConfig>;
    owners: string[];
  }
}