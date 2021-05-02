// Discord.js
import { Client } from "discord.js";

// Types
import { Command } from '../types'

import { promises as fs } from 'fs';

export default async (client: Client) => {
  (await fs.readdir(`${__dirname}/../commands`)).forEach(async category => {
    const commandFiles = (await fs.readdir(`${__dirname}/../commands/${category}`)).filter(file => file.endsWith('.ts'));
  
    for (let file of commandFiles) {
      // @ts-ignore
      const command: Command = (await import(`../commands/${category}/${file}`)).default;
      
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