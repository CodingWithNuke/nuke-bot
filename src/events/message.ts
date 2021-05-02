import { Client, Message } from 'discord.js';

import { Command } from './../types/command';

import ms from 'ms';

import { findOrFetchGuild } from '../utils/guild';

export default {
  run: async (client: Client, message: Message) => {
    if (message.author.bot || !message.guild) return
    
    const guildConfig = await findOrFetchGuild(client, message.guild.id);

    if (!message.content.startsWith(guildConfig.prefix)) return;

    const [cmd, ...args] = message.content.trim().slice(guildConfig.prefix.length).split(/ +/g);

    let command: Command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase())!);

    if (!command || command.disabled) return;

    if (command.permissions) {
      if (command.permissions.ownerOnly && !client.owners.includes(message.member!.id)) {
        return message.reply(`only bot owners can run this command.`)
      }
      if (command.permissions.guildOwnerOnly && message.author.id != message.guild.ownerID) {
        return message.reply(`only the owner of this guild can run this command.`)
      }
      if (command.permissions.bot) {
        if (!message.guild.me?.permissions.has(command.permissions.bot ?? [])) {
          return message.reply(`I'm missing some permissions, I require the following permissions to run this command: ${command.permissions.bot.join(', ')}.`)
        } 
      }
      if (command.permissions.user) {
        if (!message.member?.permissions.has(command.permissions.user ?? [])) {
          return message.reply(`you are missing some permissions, required permission(s) to run this command are: ${command.permissions.user.join(', ')}.`)
        }
      }
    }

    const cooldownName = `${message.author.id}-${command.name}`;
    if (client.cooldowns.has(cooldownName)) {
      return message.reply(`you're on a cooldown, try again in ${ms(client.cooldowns.get(cooldownName)! - Date.now(), { long: true })}.`);
    }

    try {
      await command.run(client, message, args);

      if (command.cooldown) {
        client.cooldowns.set(cooldownName, Date.now() + command.cooldown);

        setTimeout(() => {
          client.cooldowns.delete(cooldownName);
        }, command.cooldown);
      }
    } catch (error) {
      console.log(error);
      
      return message.channel.send('An error occurred whilst trying to run the command.');
    }
  }
}