export interface FavMovies {
  id: string;
  movieId: number;
  isFavorite: boolean;
  title: string;
  genres: {
    id: number,
    name: string,
  }[],
  overview: string;
  popularity: number;
  voteAverage: number;
  releaseDate: string;
  posterPath?: string;
  budget: number;
  status: string;
  runtime: number;
  revenue: number;
}
