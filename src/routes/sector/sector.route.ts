import { Router } from 'express';
import { ErrorType } from '../../core/enums/error.enum';
import { IRecord } from '../../core/interfaces/record.interface';
import { ISector } from '../../core/interfaces/sector.interface';
import Sector from '../../models/sector';
import User from '../../models/user';
import { checkRecord, findRecord, getSectors, updateRecord } from './actions';

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

    const recordKeys = ['text', 'executionPlanTime'];
    for (const key of recordKeys) {
      if (!(record as any)[key]) {
        res.status(400).json({
          type: ErrorType.FIELD_IS_EMPTY,
          message: `${key}_empty`,
        });
        return;
      }
    }
    const { text, executionPlanTime } = record;

    const posibleSectors = await Sector.find({ title });
    const userSectors = new Set<string>(user.get('sectors').map(String));

    const curSector = posibleSectors.find((item) => userSectors.has(item.id));

    if (curSector) {
      curSector.get('records').push({ text, executionPlanTime });
      await curSector.save();
      const updatedSector = await Sector.findById(curSector.id);
      const records: Partial<IRecord>[] = updatedSector.get('records');
      res.status(201).json({ id: records[records.length - 1].id });
      return;
    }

    const sector = new Sector({
      title,
      records: [{ text, executionPlanTime }],
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

router.post('/update', async (req, res) => {
  try {
    const records: IRecord[] = (req as any).query.records.map(JSON.parse);
    const id: string = (req as any).query?.userId;

    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({
        type: ErrorType.USER_NOT_EXIST,
        message: 'Incorrect user id',
      });
      return;
    }

    try {
      records.forEach(checkRecord);
    } catch(e) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: e.message,
      });
    }


    try {
      for (const record of records) {
        await updateRecord(record, user);
      }
    } catch (e) {
      res.status(400).json({
        type: ErrorType.RECORD_NOT_EXIST,
        message: e.message,
      });
      return;
    }

    res.status(201).send('Update success');
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

    const sectors = await getSectors(user);

    res.json({ sectors });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

export default router;
