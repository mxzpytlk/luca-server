import { IRecord } from '../../core/interfaces/record.interface';
import { ISector } from '../../core/interfaces/sector.interface';
import { IUser } from '../../core/interfaces/user.interface';
import { MDocument } from '../../core/types';
import Sector from '../../models/sector';

export async function findRecord(id: string, user: MDocument<IUser>): Promise<{ record: IRecord; sector: MDocument<ISector> }> {
  const sectors = await getSectors(user);
  for (const sector of sectors) {
    const idx = sector.records.findIndex((item: IRecord) => item.id === id);
    if (idx !== -1) {
      const resRecord = sector.records[idx];
      return { record: resRecord, sector };
    }
  }
  return null;
}

export async function getSectors(user: MDocument<IUser>): Promise<MDocument<ISector>[]> {
  const sectorids = user.sectors as string[];
  return await Sector.find({
    _id: sectorids,
  });
}

export function checkRecord(record: IRecord) {
  const recordKeys = ['text', 'executionPlanTime'];
  for (const key of recordKeys) {
    if (!(record as any)[key]) {
      throw new Error(`${key} can not be empty`);
    }
  }
}

export async function updateRecord(record: IRecord, user: MDocument<IUser>) {
  const result = await findRecord(record.id, user);
  if (!result) {
    throw new Error('This record does not exist');
  }

  const resultRecord: IRecord = result.record;
  const sector = result.sector;

  resultRecord.text = record.text;
  resultRecord.executionDate = record.executionDate;
  resultRecord.executionPlanTime = record.executionPlanTime;
  resultRecord.executionIntervals = record.executionIntervals;
  await sector.save();
}
