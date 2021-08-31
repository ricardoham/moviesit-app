export interface Movies {
  movieId?: number;
  title?: string;
  genres?: {
    id?: number;
    name?: string;
  }[]
}

export interface Recommendations{
  _id?: string
  id?: string;
  userId?: string;
  createdBy?: string;
  createdAt?: Date;
  title?: string;
  description?: string;
  movies?: Movies[];
  upVote?: number;
}
