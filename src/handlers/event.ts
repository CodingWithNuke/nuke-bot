import { Client } from 'discord.js';
import { promises as fs } from 'fs'

export default async (client: Client) => {
  (await fs.readdir(`${__dirname}/../events`)).forEach(async file => {
    if (!file.endsWith('.ts')) return;

    const event = (await import(`../events/${file}`)).default;
    const eventName = file.split('.')[0];
    
    client.on(eventName, event.run.bind(null, client))
  })
}