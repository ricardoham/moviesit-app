import { TMDBMovieDetail } from './tmbd';

export interface FavMovies extends TMDBMovieDetail {
  id: string;
  movieId: number;
  isFavorite: boolean;
}
