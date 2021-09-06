export interface ListModel {
  _id?: string;
  id?: number | string;
  itemId?: number;
  header?: string;
  poster?: string;
  overview?: string;
  popularity?:number;
  genres?: {
    id?: number;
    name?: string;
  }[]
}
