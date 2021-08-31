import { Movies } from './recommendations';

export interface WaitList {
  _id?: string;
  id?: string;
  title?: string;
  comment?: string;
  dueDate?: Date
  movie?: Movies
}
