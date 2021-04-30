import { IAnswer } from '@/modules/IAnswer'

export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
}
