import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config.json';

export function allowAuth(req: Request, res: Response, next: any) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    }
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    (req as any).userId = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Auth error' })
  }
}
