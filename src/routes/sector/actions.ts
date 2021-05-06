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