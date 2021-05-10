import { IDateInterval } from "./date-interval.interface";

export interface IRecord {
  id: string;
  text: string;
  executionDate: Date;
  executionPlanTime: number;
  executionIntervals?: IDateInterval[];
  _id?: string;
}
