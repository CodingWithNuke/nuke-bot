import { Client } from 'discord.js';
import fs from 'fs'

export default (client: Client) => {
  fs.readdirSync(`${__dirname}/../events`).forEach(async file => {
    if (!file.endsWith('.ts')) return;
    
    // @ts-ignore
    const event = (await import(`../events/${file}`)).default;
    const eventName = file.split('.')[0];
    
    client.on(eventName, event.run.bind(null, client))
  })
}