// Discord.js
import { Client, Message, TextChannel } from "discord.js";

// Types
import { Command } from "../../types";

export default {
  name: "slowmode",
  aliases: [],
  usage: "slowmode (time in seconds)",
  description: "Set the slowmode of the current channel.",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: ["MANAGE_CHANNELS"],
    user: ["MANAGE_CHANNELS"],
    ownerOnly: false,
    guildOwnerOnly: false
  },

  run: async (client: Client, message: Message, args: string[]) => {
    if (message.channel instanceof TextChannel) {
      if (!args.length) {
        return message.channel.setRateLimitPerUser(0, "Removed slowmode.")
      }
  
      if (isNaN(Number(args[0]))) {
        return message.reply('you need to provide the amount of seconds to set the slowmode to.')
      }

      return message.channel.setRateLimitPerUser(Number(args[0]) > 21600 ? 21600 : Number(args[0]));
    }
  },
} as Command;
