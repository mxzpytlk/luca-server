import { ISector } from "./sector.interface";

export interface IUser {
  name: string;
  id: string;
  _id?: string;
  pass: string;
  sectors: string[] | ISector[];
}