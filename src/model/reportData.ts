interface ReportItemData {
  name?: string;
  total?: number;
  currentMonthTotal?: number;
}

export interface ReportData {
  recommendations: ReportItemData;
  favMovies: ReportItemData;
  favPeople: ReportItemData;
  profile: ReportItemData;
  banComments: ReportItemData;
  waitList: ReportItemData;
}
