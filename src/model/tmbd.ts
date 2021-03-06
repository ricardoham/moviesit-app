export interface TMDB {
  id: number;
  title: string;
  genre: number[];
  overview: string;
  popularity: number;
  voteAverage: number;
  releaseDate: string;
  posterPath: string;
}

export interface TMDBResults {
  results: TMDBMovieDetail[];
  page: number;
  totalPages: number;
}

export interface TMDBMovieDetail {
  id?: number | string;
  movieId?: number;
  isFavorite?: boolean;
  title: string;
  genres: {
    id: number,
    name?: string,
  }[],
  overview: string;
  popularity: number;
  voteAverage: number;
  releaseDate: string;
  posterPath?: string;
  budget?: number;
  status?: string;
  runtime?: number;
  revenue?: number;
}
