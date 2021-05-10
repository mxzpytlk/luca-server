import { Router, Request, Response } from 'express';
import { ErrorType } from '../../core/enums/error.enum';
import { IRecord } from '../../core/interfaces/record.interface';
import { ISector } from '../../core/interfaces/sector.interface';
import { IUser } from '../../core/interfaces/user.interface';
import { MDocument } from '../../core/types';
import Sector from '../../models/sector';
import User from '../../models/user';
import { findRecord, getSectors } from './actions';

const router = Router();

router.delete('/delete/sector', async (req: Request, res: Response) => {
  try {
    const id: string = req.query.userId as string;
    const user: MDocument<IUser> = await User.findById(id);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    const removeIds = req.query?.removeIds as string[];
    await Sector.deleteMany({
      _id: removeIds,
    });

    const sectors = await getSectors(user);
    user.sectors = (sectors as ISector[]);
    await user.save();

    res.send('Success delete');
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.delete('/delete/record', async (req: Request, res: Response) => {
  try {
    const { userId, id } = req.query;
    const user: MDocument<IUser> = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    const { sector, record } = await findRecord(id as string, user);
    const idx = sector.records.findIndex((item: IRecord) => item.id === record.id);
    sector.records.splice(idx, 1);
    await sector.save();

    res.json(sector);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

export default router;
