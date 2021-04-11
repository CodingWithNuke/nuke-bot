import { Client, Message, PermissionString } from "discord.js";

export interface Command {
  name: string;
  aliases?: string[] | [];
  usage?: string;
  description?: string;
  category?: string;
  cooldown?: number;
  disabled?: boolean;
  permissions?: {
    bot?: PermissionString[] | [],
    user?: PermissionString[] | [],
    ownerOnly?: boolean;
    guildOwnerOnly?: boolean;
  };
  run: ((client: Client, message: Message, args: string[]) => Promise<void>) | ((client: Client, message: Message, args: string[]) => void);
}