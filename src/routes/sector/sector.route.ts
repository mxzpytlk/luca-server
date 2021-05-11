import { Router, Request, Response } from 'express';
import { ErrorType } from '../../core/enums/error.enum';
import { IRecord } from '../../core/interfaces/record.interface';
import { ISector } from '../../core/interfaces/sector.interface';
import { IUser } from '../../core/interfaces/user.interface';
import { MDocument } from '../../core/types';
import Sector from '../../models/sector';
import User from '../../models/user';
import { checkRecord, getSectors, updateRecord } from './actions';

const router: Router = Router();

router.post('/add', async (req: Request, res: Response) => {
  try {
    const title = req.query.title as string;
    const record: IRecord = JSON.parse(req.query.record as string);
    const id = req.query.userId as string;

    const user: MDocument<IUser> = await User.findById(id);
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

    try {
      checkRecord(record);
    } catch(e) {
      res.status(400).json({
        type: ErrorType.FIELD_IS_EMPTY,
        message: e.message,
      });
      return;
    }
    const { text, executionPlanTime } = record;

    const posibleSectors: MDocument<ISector>[] = await Sector.find({ title });
    const userSectors = new Set<string>(user.get('sectors').map(String));

    const curSector = posibleSectors.find((item) => userSectors.has(item.id));

    if (curSector) {
      curSector.get('records').push({ text, executionPlanTime });
      await curSector.save();
      const updatedSector: MDocument<ISector> = await Sector.findById(curSector.id);
      const records = updatedSector.records;
      res.status(201).json({ recordId: records[records.length - 1].id });
      return;
    }

    const sector: MDocument<ISector> = new Sector({
      title,
      records: [{ text, executionPlanTime }],
    });

    const resultSector = await sector.save();
    user.sectors.push(resultSector.id);
    await user.save();
    res.status(201).json({ sectorId: resultSector.id, recordId: resultSector.records[0].id });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.post('/update', async (req: Request, res: Response) => {
  try {
    const records: IRecord[] = (req as any).query.records.map(JSON.parse);
    const id = req.query?.userId as string;

    const user: MDocument<IUser> = await User.findById(id);
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

router.get('/', async (req: Request, res: Response) => {
  try {
    const id: string = req.query?.userId as string;
    const user: MDocument<IUser> = await User.findById(id);
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
