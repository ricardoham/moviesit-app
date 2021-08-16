export interface TMDBPeopleDetail {
  id?: number | string;
  peopleId?: number;
  name: string;
  birthDay?: string;
  deathDay?: string | null;
  placeOfBirth?: string;
  department?: string;
  biography?: string;
  popularity?: number;
  profilePatch?: string;
}

export interface TMDBPeopleResults {
  results: TMDBPeopleDetail[];
  page: number;
  totalPages: number;
}
