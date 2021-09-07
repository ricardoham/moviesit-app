import { TMDBMovieDetail } from './tmbd';
import { TMDBPeopleDetail } from './tmdbpeople';

export interface FavMovies extends TMDBMovieDetail {
  _id?: string;
  movieId: number;
  isFavorite: boolean;
  createdAt: Date;
}

export interface FavPeople extends TMDBPeopleDetail {
  _id?: string;
  personId?: number;
  isFavorite?: boolean;
  createdAt: Date;
}
