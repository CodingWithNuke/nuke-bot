// Discord.js
import { Client, Message, TextChannel } from "discord.js";

// Types
import { Command } from "../../types";

import ms from 'ms';

export default {
  name: "slowmode",
  aliases: ['slow', 'timeout', 'setslowmode'],
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
        message.channel.setRateLimitPerUser(0, "Removed slowmode.");
        return message.reply("I've reset the slowmode of this channel.")
      }
  
      if (isNaN(Number(args[0]))) {
        return message.reply('you need to provide the amount of seconds to set the slowmode to.')
      }

      const slowmodeTime = Number(args[0]) > 21600 ? 21600 : Number(args[0]) < 0 ? 0 : Number(args[0]) > 21600 ? 21600 : Number(args[0]);

      message.channel.setRateLimitPerUser(slowmodeTime);

      if (slowmodeTime > 0) {
        return message.reply(`I've set the slowmode to ${ms(slowmodeTime * 1000, { long: true })}.`)
      } else {
        return message.reply(`I've reset the slowmode of this channel.`)
      }
    }
  },
} as Command;
