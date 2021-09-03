import { Movies, Recommendations } from './recommendations';

export interface IListCard extends Recommendations{
  _id?: string;
  id?: string;
  title?: string;
  comment?: string;
  dueDate?: Date
  movie?: Movies
}
