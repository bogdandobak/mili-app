import { IAnswer } from '@/modules/IAnswer'

export interface IQuestion {
  id: number;
  points: number;
  question: string;
  answers: IAnswer[];
}
