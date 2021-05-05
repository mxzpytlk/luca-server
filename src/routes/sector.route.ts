import { Router } from 'express';
import { ErrorType } from '../core/enums/error.enum';
import { IRecord } from '../core/interfaces/record.interface';
import Sector from '../models/sector';
import User from '../models/user';

const router = Router();

router.post('/add', async (req, res) => {
  try {
    const title = (req as any).query.title;
    const record: IRecord = JSON.parse((req as any).query.record);
    const id: string = (req as any).query?.userId;

    const user = await User.findById(id);
    if (!user) {
      
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    if (!title) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: 'Title can not be empty',
      });
      return;
    }

    const recordKeys = ['text', 'executionDate', 'executionPlanTime'];
    for (const key of recordKeys) {
      if (!(record as any)[key]) {
        res.status(400).json({
          type: ErrorType.FIELD_IS_EMPTY,
          message: `${key} can not be empty`,
        });
        return;
      }
    }
    const { text, executionDate, executionPlanTime } = record;

    const possibleSector = await Sector.findOne({ title });
    if (possibleSector) {
      possibleSector.get('records').push({ text, executionDate, executionPlanTime });
      await possibleSector.save();
      res.status(201).send('Add record succes');
      return;
    }

    const sector = new Sector({
      title,
      records: [{ text, executionDate, executionPlanTime }],
    });

    const resultSector = await sector.save();
    user.get('sectors').push(resultSector.id);
    await user.save();
    res.status(201).json({ id: resultSector.id });

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const id: string = (req as any).query?.userId;
    const user: any = await User.findById(id);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    const sectorids: string[] = user.sectors;
    const sectors = await Sector.find({
      '_id' : sectorids,
    });

    res.json({ sectors });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.delete('/delete/sector', async (req, res) => {
  try {
    const id: string = (req as any).query?.userId;
    const user: any = await User.findById(id);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    const removeIds: string[] = (req as any).query?.removeIds;
    await Sector.deleteMany({
      '_id' : removeIds,
    });

    res.send('Success delete');
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

export default router;