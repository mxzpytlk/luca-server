import { IRecord } from './record.interface';

export interface ISector {
  id: string;
  title: string;
  records: IRecord[];
  _id: string;
}
