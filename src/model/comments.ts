export interface Comments {
  _id?: string;
  id?: string;
  commentedItemId?: string;
  userId?: string;
  comment?: string;
  createdBy?: string;
  createdAt?: Date;
}

export interface CommentReport {
  _id?: string;
  id?: string;
  userId?: string
  userReportedId?: string;
  userReportName?: string;
  commentedItemId?: string;
  commentCreatedBy?: string;
  commentCreatedAt?: Date;
  createdAt?: Date;
  comment?: string;
}
