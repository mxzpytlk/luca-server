import { IDateInterval } from "./date-interval.interface";


// TODO избавиться от executionTime
export interface IRecord {
  id: string;
  text: string;
  executionDate: Date;
  executionPlanTime: number;
  executionTime?: number;
  executionIntervals?: IDateInterval[];
  _id?: string;
}
