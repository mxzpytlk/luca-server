import { ErrorType } from '../../core/enums/error.enum';
import { IRecord } from '../../core/interfaces/record.interface';
import Sector from '../../models/sector';

export async function findRecord(id: string, user: any): Promise<any> {
  const sectors = await getSectors(user);
  for (const sector of sectors) {
    const idx: number = sector.get('records').findIndex((item: IRecord) =>  item.id === id);
    if (idx !== -1) {
      const resRecord = sector.get('records')[idx];
      return { record: resRecord, sector };
    }
  }
  return null;
}

export async function getSectors(user: any) {
  const sectorids: string[] = user.sectors;
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

export async function updateRecord(record: IRecord, user: any) {
  const result = await findRecord(record.id, user);
    if (!result) {
      throw new Error('This record does not exist');
    }

    const resultRecord: IRecord = result.record;
    const sector = result.sector;

    resultRecord.text = record.text;
    resultRecord.executionDate = record.executionDate;
    resultRecord.executionPlanTime = record.executionPlanTime;
    resultRecord.executionTime = record.executionTime;
    resultRecord.executionIntervals = record.executionIntervals;
    await sector.save();
}
