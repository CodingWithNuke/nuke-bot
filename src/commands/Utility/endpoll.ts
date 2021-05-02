// Discord.js
import { Client, Message, MessageEmbed } from "discord.js";

// Types
import { Command } from "../../types";

import { COLORS } from "../../utils/constants";

export default {
  name: "endpoll",
  aliases: ["epoll"],
  usage: "endpoll [message id]",
  description: "End a poll, this will replace the poll embed with a results embed.\nMust be sent in the same channel as the poll.",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: ["EMBED_LINKS"],
    user: ["MANAGE_GUILD"],
    ownerOnly: false,
    guildOwnerOnly: false,
  },

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) {
      return message.reply('you need to provide a message id.')
    }

    const pollMessage = await message.channel.messages.fetch(args[0]);
    const pollReactions = pollMessage.reactions.cache;

    const results: any[] = [];
    let total = 0;
    
    pollReactions.each((reaction) => {
      results.push({ emoji: reaction.emoji, count: reaction.count! - 1 || 0 });
      total += reaction.count! - 1 || 0;
    })

    let description = '';
    results.forEach((result, index) => {
      description += `${result.emoji} \`${isNaN(Math.round((result.count / total) * 100)) ? 0 : Math.round((result.count / total) * 100)}%\`\n`
    })

    pollMessage.edit(new MessageEmbed({
      color: COLORS.RED,
      fields: [
        {
          name: 'Question',
          value: pollMessage.embeds[0].fields[0].value
        },
        {
          name: 'Results',
          value: description
        }
      ]
    }))
    
  },
} as Command;
