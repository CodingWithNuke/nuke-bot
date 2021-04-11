// Discord.js
import { Client } from "discord.js";

// Types
import { Command } from '../types'

import fs from 'fs';

export default (client: Client) => {
  fs.readdirSync(`${__dirname}/../commands`).forEach(category => {
    const commands = fs.readdirSync(`${__dirname}/../commands/${category}`).filter(file => file.endsWith('.ts'));
  
    for (let file of commands) {
      const command: Command = require(`../commands/${category}/${file}`).default;
      client.categories.add(category);
  
      if (command.name) {
        command.category = category.toLowerCase();
        client.commands.set(command.name || file.split('.')[0], command);
      }
  
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach((alias: string) => client.aliases.set(alias, command.name))
      }
    }
  })
}