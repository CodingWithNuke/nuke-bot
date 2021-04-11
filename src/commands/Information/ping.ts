import { COLORS } from "../../utils/constants";
// Discord.js
import { Client, Message, MessageEmbed } from "discord.js";

// Types
import { Command } from '../../types'

export default {
  name: "ping",
  aliases: [],
  usage: "ping",
  description: "Pong!",
  cooldown: 3000,
  disabled: false,
  permissions: {
    bot: [],
    user: [],
    ownerOnly: false,
    guildOwnerOnly: false
  },

  run: async (client: Client, message: Message, args: string[]) => {
    const loadMessage = await message.channel.send(
      "<a:loading:818232835373793370>"
    );

    await loadMessage.delete();

    await message.channel.send(
      new MessageEmbed({
        title: "🏓 Pong!",
        color: COLORS.BLUE,
        fields: [
          {
            name: "Latency",
            value: `\`${
              loadMessage.createdTimestamp - message.createdTimestamp
            }ms\``,
          },
          {
            name: "API Latency",
            value: `\`${Math.round(client.ws.ping)}ms\``,
          },
        ],
      })
    );
  },
} as Command;
