// Discord.js
import { Client, Message } from "discord.js";

// Types
import { Command } from '../../types'

export default {
  name: "ban",
  aliases: [],
  usage: "ban [user] (reason)",
  description: "Ban a user.",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: ["BAN_MEMBERS"],
    user: ["BAN_MEMBERS"],
    ownerOnly: false,
    guildOwnerOnly: false
  },

  run: async (client: Client, message: Message, args: string[]) => {
    const target =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]);
    if (!target) {
      return message.reply("I couldn't find that user.");
    }

    const reason = args.slice(1).join(" ") || "No reason provided.";

    if (
      message.member?.roles.highest.position! <=
        target.roles.highest.position &&
      message.guild?.ownerID != message.author.id
    ) {
      return message.reply("you can't ban this user.");
    }
    if (
      message.guild?.me?.roles.highest.position! <=
      target.roles.highest.position
    ) {
      return message.reply("I can't ban this user.");
    }

    await message.guild?.members.ban(target.id, { reason });
    return message.reply(`${target.user.tag} has been banned.`);
  },
} as Command;
