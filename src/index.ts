import express from 'express';
import config from '../config.json';
import mongoose from 'mongoose';

import authRoute from './routes/auth.route';
import recordRoute from './routes/sector/sector.route';
import recordDelete from './routes/sector/delete-record.route';
import { allowOrigin } from './middleware/allow-origin.middlewate';

const PORT = process.env.PORT || config?.port || 3000;

const app: express.Application = express();

app.use(allowOrigin);

app.use('/api/auth', authRoute);
app.use('/api/record', recordRoute);
app.use('/api/record', recordDelete);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('<h1>Test</h1>');
});

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
