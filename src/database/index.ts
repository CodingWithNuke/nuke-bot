import mongoose from 'mongoose';

export default () => {
  mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection.on('connected', () => console.log('Connected to the DB...'));
  mongoose.connection.on('disconnected', () => console.log('Disconnected from the DB...'));
  mongoose.connection.on('error', (error) => console.log('An error occurred', error));
}