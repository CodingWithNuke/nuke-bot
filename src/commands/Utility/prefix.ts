// Discord.js
import { Client, Message } from "discord.js";

// Types
import { Command } from '../../types'

import { GuildConfig } from "../../database/models";

export default {
  name: "prefix",
  aliases: [],
  usage: "prefix (prefix)",
  description: "Get or set the command prefix for this server.",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: [],
    user: ["MANAGE_GUILD"],
    ownerOnly: false,
    guildOwnerOnly: false
  },

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args.length) {
      return message.reply(
        `the prefix for this server is \`${
          client.guildConfigs.get(message.guild!.id)?.prefix
        }\``
      );
    }

    const guildConfig = await GuildConfig.findOneAndUpdate(
      { guild: message.guild?.id },
      { prefix: args[0] },
      { new: true }
    );
    client.guildConfigs.set(message.guild!.id, guildConfig!);

    return message.reply(`I've changed the prefix of this server to \`${guildConfig?.prefix}\``);
  },
} as Command;
