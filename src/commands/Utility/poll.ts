// Discord.js
import { Client, Message, MessageEmbed } from "discord.js";

// Types
import { Command } from "../../types";

import { COLORS } from "../../utils/constants";

export default {
  name: "poll",
  aliases: [],
  usage: "poll [question]",
  description: "Create a poll",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: ["EMBED_LINKS"],
    user: ["MANAGE_GUILD"],
    ownerOnly: false,
    guildOwnerOnly: false,
  },

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args.length) return;

    const embed = new MessageEmbed({
      color: COLORS.BLUE,
      fields: [
        {
          name: "Poll",
          value: args.join(" "),
        },
      ],
    });

    const embedMessage = await message.channel.send(embed);

    embedMessage.react("767850659147415612");
    embedMessage.react("767850659084369990");
  },
} as Command;
