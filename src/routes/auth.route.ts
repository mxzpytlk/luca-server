import { Router, Request, Response } from 'express';
import { IAuth, IChangePass } from '../core/interfaces/auth.interface';
import { ErrorType } from '../core/enums/error.enum';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config.json';
import { IUser } from '../core/interfaces/user.interface';
import { MDocument } from '../core/types';

const router: Router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, pass }: Partial<IAuth> = req.query;

    if (!name) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: 'Name can not be empty',
      });
      return;
    }

    if (!pass) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: 'Password can not be empty',
      });
      return;
    }

    const candidate: MDocument<IUser> = await User.findOne({ name });

    if (candidate) {
      res.status(400).json({
        type: ErrorType.USER_EXIST,
        message: 'This user already exists',
      });
      return;
    }

    const hashPass = await bcrypt.hash(pass, 15);
    const user = new User({
      name,
      pass: hashPass,
    });

    await user.save();
    res.status(201).send('Register succes');
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { name, pass }: Partial<IAuth> = req.query;

    if (!name) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: 'Name can not be empty',
      });
      return;
    }

    if (!pass) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: 'Password can not be empty',
      });
      return;
    }

    const user: MDocument<IUser> = await User.findOne({ name });
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'This user does not exist',
      });
      return;
    }

    const isMatch = await bcrypt.compare(pass, user.pass);

    if (!isMatch) {
      res.status(400).json({
        type: ErrorType.WRONG_PASS,
        message: 'Incorrect password',
      });
      return;
    }

    const token = jwt.sign(
      { userId: user.id } as object,
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    res.json({ token, id: user.id });

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.post('/change/pass', async (req: Request, res: Response) => {
  try {
    const { oldPass, newPass, userId }: Partial<IChangePass> = req.query;
    const user: MDocument<IUser> = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'This user does not exist',
      });
      return;
    }

    if (!newPass) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: 'New pass is empty',
      });
      return;
    }

    const isMatch = await bcrypt.compare(oldPass as string, user.get('pass'));
    if (!isMatch) {
      res.status(400).json({
        type: ErrorType.WRONG_PASS,
        message: 'incorrect_pass',
      });
      return;
    }

    const hashPass = await bcrypt.hash(newPass as string, 15);
    (user as any).pass = hashPass;
    await user.save();

    res.json({ message: 'Change password success' });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

export default router;
