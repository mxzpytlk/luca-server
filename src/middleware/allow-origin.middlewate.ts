import { Request, Response } from 'express';

export function allowOrigin(req: Request, res: Response, next: any) {
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
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}
