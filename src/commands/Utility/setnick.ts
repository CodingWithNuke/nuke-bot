// Discord.js
import { Client, Message } from "discord.js";

// Types
import { Command } from '../../types'

export default {
  name: "setnick",
  aliases: ["nick"],
  usage: "setnick [user] (nickname)",
  description: "Change the nickname of a user.",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: ["MANAGE_NICKNAMES"],
    user: ["MANAGE_NICKNAMES"],
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

    const nickname = args.slice(1).join(" ") || "";

    target.setNickname(nickname);

    if (!nickname) {
      return message.reply(`${target.user.tag}'s nickname has been reset.`);
    }

    return message.reply(
      `${target.user.tag}'s nickname has been changed to \`${nickname}\`.`
    );
  },
} as Command;
