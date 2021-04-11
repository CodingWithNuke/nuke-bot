import { Client } from "discord.js";

export default {
  run: (client: Client) => {
    console.log(`${client.user?.username} is now online!`);

    client.user?.setPresence({
      activity: { name: "my developer make me", type: "WATCHING" },
    });
  },
};
