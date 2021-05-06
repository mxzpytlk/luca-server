import { Router } from 'express';
import { ErrorType } from '../../core/enums/error.enum';
import { IRecord } from '../../core/interfaces/record.interface';
import Sector from '../../models/sector';
import User from '../../models/user';
import { findRecord, getSectors } from './actions';

const router = Router();

router.delete('/delete/sector', async (req, res) => {
  try {
    const id: string = (req as any).query?.userId;
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    const removeIds: string[] = (req as any).query?.removeIds;
    await Sector.deleteMany({
      _id: removeIds,
    });

    const sectors = await getSectors(user);
    (user as any).sectors = sectors;
    await user.save();

    res.send('Success delete');
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.delete('/delete/record', async (req, res) => {
  try {
    const { userId, id } = (req as any).query;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    const { sector, record } = await findRecord(id, user);
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
