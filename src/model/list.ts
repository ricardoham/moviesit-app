export interface ListModel {
  id?: number | string;
  movieId?: number;
  header?: string;
  poster?: string;
  overview?: string;
  popularity?:number;
  genres?: {
    id?: number;
    name?: string;
  }[]
}
