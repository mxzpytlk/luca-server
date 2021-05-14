import express from 'express';
import config from '../config.json';
import mongoose from 'mongoose';

import authRoute from './routes/auth.route';
import recordRoute from './routes/sector/sector.route';
import recordDelete from './routes/sector/delete-record.route';

const PORT = process.env.PORT || config?.port || 3000;

const app: express.Application = express();


app.use('/api/auth', authRoute);
app.use('/api/record', recordRoute);
app.use('/api/record', recordDelete);

app.use(express.static('public'));

app.use('/luca/', express.static('public'));

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

start();
