export interface ListModel {
  id?: number | string;
  tmdbId?: number;
  header?: string;
  poster?: string;
  overview?: string;
  popularity?:number;
  genres?: {
    id?: number;
    name?: string;
  }[]
}
