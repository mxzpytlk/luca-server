import express from 'express';
import config from '../config.json';
import mongoose from 'mongoose';

import authRoute from './routes/auth.route';
import recordRoute from './routes/sector.route';

const PORT = config?.port || 3000;

const app = express();

function allowOrigin(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr'
  );
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}

app.use(allowOrigin);

app.use('/api/auth', authRoute);
app.use('/api/record', recordRoute);

async function start() {
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
