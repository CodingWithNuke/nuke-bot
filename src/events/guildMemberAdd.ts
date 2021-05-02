import { Client, GuildMember } from "discord.js";

import { findOrFetchGuild } from "../utils/guild";

export default {
  run: async (client: Client, member: GuildMember) => {
    const guildConfig = await findOrFetchGuild(client, member.guild.id);

    if (!guildConfig?.welcomeChannel) return;

    const welcomeChannel = member.guild.channels.cache.get(guildConfig?.welcomeChannel) || member.guild.channels.resolve(guildConfig?.welcomeChannel!);
    
    if (welcomeChannel && welcomeChannel.isText()) {
      welcomeChannel.send(`Welcome, <@${member.user.id}> to **${member.guild.name}**.`)
    }
  },
};
