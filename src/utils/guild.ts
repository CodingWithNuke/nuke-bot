import { Client } from 'discord.js';
import { GuildConfig } from '../database/models';

export async function findOrFetchGuild(client: Client, guildId: string) {
  let guildConfig = client.guildConfigs.get(guildId)

  if (!guildConfig) {
    let newGuildConfig = await GuildConfig.findOne({
      guild: guildId
    })

    if (!newGuildConfig) {
      newGuildConfig = await GuildConfig.create({
        guild: guildId
      })
    }
    
    client.guildConfigs.set(guildId, newGuildConfig);
    guildConfig = newGuildConfig;
  }

  return guildConfig;
}