// Discord.js
import { Client, Message } from "discord.js";

// Types
import { Command } from "../../types";

import { GuildConfig } from "../../database/models";

export default {
  name: "setwelcome",
  aliases: ["setgoodbye"],
  usage: "setwelcome [welcome/goodbye channel]",
  description: "Set the welcome/goodbye channel for this server.",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: [],
    user: ["MANAGE_GUILD", "MANAGE_CHANNELS"],
    ownerOnly: false,
    guildOwnerOnly: false
  },

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args.length) {
      return message.reply("you need to provide a channel to set as the welcome/goodbye channel.")
    }

    const target = message.mentions.channels?.first() || message.guild?.channels.cache.get(args[0]);

    if (!target) {
      return message.reply("I couldn't find that channel.");
    }

    const guildConfig = await GuildConfig.findOneAndUpdate(
      { guild: message.guild?.id },
      { welcomeChannel: target.id },
      { new: true }
    );
    client.guildConfigs.set(message.guild!.id, guildConfig!);

    return message.reply(`I've changed the welcome/goodbye channel of this server to <#${guildConfig?.welcomeChannel}>.`);
  },
} as Command;
