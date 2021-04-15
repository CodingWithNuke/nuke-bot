// Discord.js
import { Client, Message, MessageEmbed } from "discord.js";

// Types
import { Command } from "../../types";

import ms from "ms";
import { COLORS } from '../../utils/constants';
import { findOrFetchGuild } from "../../utils/helpers";

export default {
  name: "help",
  aliases: ["commands"],
  usage: "help (command)",
  description: "Help",
  cooldown: 1000,
  disabled: false,
  permissions: {
    bot: ["EMBED_LINKS"],
    user: [],
    ownerOnly: false,
    guildOwnerOnly: false
  },

  run: async (client: Client, message: Message, args: string[]) => {
    const guildConfig = await findOrFetchGuild(client, message.guild!.id);

    const embed = new MessageEmbed();
    embed.setColor(COLORS.BLUE)

    if (!args.length) {
      embed.setFooter(
        `Type ${guildConfig.prefix}help (command) for more information.`
      );

      [...client.categories].forEach((category) => {
        embed.addField(
          `${category} [${
            client.commands.filter(
              (cmd) => cmd.category == category.toLowerCase()
            ).size
          }]`,
          client.commands
            .filter((cmd) => cmd.category == category.toLowerCase())
            .map((cmd) => `\`${guildConfig.prefix}${cmd.name}\``)
            .join("\n"),
          true
        );
      });

      message.channel.send(embed);
    } else {
      const cmd =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.get(client.aliases.get(args[0].toLowerCase())!);
      if (!cmd) {
        return message.reply(
          `no command found with name \`${args[0].toLowerCase()}\``
        );
      }

      embed.setTitle(`Command: ${guildConfig.prefix}${cmd.name}`);
      embed.setFooter(`[] = Required, () = Optional`);

      const descriptionArray = [];
      if (cmd.category) {
        descriptionArray.push(
          `**Category:** ${
            cmd.category[0].toUpperCase() + cmd.category.slice(1).toLowerCase()
          }`
        );
      }

      if (cmd.description) {
        descriptionArray.push(`**Description:** ${cmd.description}`);
      }

      if (cmd.cooldown) {
        descriptionArray.push(
          `**Cooldown:** ${ms(cmd.cooldown, { long: true })}`
        );
      }
      if (cmd.usage) {
        descriptionArray.push(
          `**Usage:** ${
            Array.isArray(cmd.usage)
              ? cmd.usage
                  .map((usage: string) => `\n\`${guildConfig.prefix}${usage}\``)
                  .join("")
              : `\`${guildConfig.prefix}${cmd.usage}\``
          }`
        );
      }
      if (
        cmd.aliases &&
        Array.isArray([...cmd.aliases]) &&
        cmd.aliases.length
      ) {
        descriptionArray.push(
          `**Aliases:** ${[...cmd.aliases]
            .map((alias: string) => `\`${alias}\``)
            .join(", ")}`
        );
      }

      embed.setDescription(descriptionArray.join("\n"));

      return message.channel.send(embed);
    }
  },
} as Command;
