export interface IRecord {
  id: string;
  text: string;
  executionDate: Date;
  executionPlanTime: number;
  executionTime?: number;
  executionIntervals?: Array<{ start: Date, end: Date}>;
  _id?: string;
}
