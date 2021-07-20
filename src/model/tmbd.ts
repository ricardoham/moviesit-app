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
  results: TMDB[];
  page: number;
  totalPages: number;
}
