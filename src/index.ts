import dotenv from 'dotenv';
dotenv.config();

import { Client, Collection } from 'discord.js';
import fs from 'fs';
import config from './config.json'

const client = new Client();

client.commands = new Collection();
client.categories = new Set();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.guildConfigs = new Collection();
client.owners = config.owners;

import database from './database';
database();

fs.readdirSync(`${__dirname}/handlers`).forEach(file => {
  if (!file.endsWith('.ts')) return;
  require(`${__dirname}/handlers/${file}`).default(client);
})

client.login(process.env.TOKEN)