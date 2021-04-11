import { Client } from 'discord.js';
import fs from 'fs'

export default (client: Client) => {
  fs.readdirSync(`${__dirname}/../events`).forEach(file => {
    if (!file.endsWith('.ts')) return;
    
    const event = require(`../events/${file}`).default;
    const eventName = file.split('.')[0];
    
    client.on(eventName, event.run.bind(null, client))
  })
}