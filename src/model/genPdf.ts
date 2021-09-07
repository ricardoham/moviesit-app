import { Movies } from './recommendations';

export interface GenPdf {
  id?: string;
  itemTitle?: string;
  overview?: string;
  createdAt?: Date;
  movies?: Movies[];
  dueDate?: Date;
}
