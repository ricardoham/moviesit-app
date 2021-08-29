import { Movies } from './recommendations';

export interface WaitList {
  title?: string;
  description?: string;
  dueDate?: Date
  movie: Movies
}
