import { model, Schema, Document } from 'mongoose';
import config from '../../config.json'

export interface IGuildConfig extends Document {
  guild: string;
  prefix: string;
  welcomeChannel: string;
};

const GuildConfig: Schema = new Schema({
  guild: {
    type: String,
    unique: true
  },
  prefix: {
    type: String,
    default: config.prefix
  },
  welcomeChannel: {
    type: String
  }
});

export default model<IGuildConfig>('GuildConfig', GuildConfig);