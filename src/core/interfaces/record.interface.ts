export interface IRecord {
  id: string;
  text: string;
  executionDate: Date;
  executionPlanTime: number;
  executionTime?: number;
  executionIntervals: { start: Date, end: Date}[],
}
