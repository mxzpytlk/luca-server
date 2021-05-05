import { Router } from 'express';
import { IAuth } from '../core/interfaces/auth.interface';
import { ErrorType } from '../core/enums/error.enum';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config.json';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, pass }: IAuth = (req.query as unknown as IAuth);

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

    const candidate = await User.findOne({ name });

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

router.post('/login', async (req, res) => {
  try {
    const { name, pass }: IAuth = (req.query as unknown as IAuth);

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

    const user: any & IAuth = await User.findOne({ name });
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
        type: ErrorType.WRONG_PATH,
        message: 'Incorrect password',
      });
      return;
    }

    const token = jwt.sign(
      { userId: user.id } as object,
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    res.json({ token });

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

export default router;
