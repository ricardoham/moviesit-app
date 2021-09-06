export interface Deposition {
  _id?: string;
  id?: string;
  userId?: string;
  commentedItemId?: string;
  createdBy?: string;
  createdAt?: Date;
  comment?: string;
}

export interface ProfileSocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: number;
  tiktok?: string;
}

export interface Profile {
  _id?: string;
  id?: string;
  hasProfile?: boolean;
  userId?: string;
  name?: string;
  picture?: string;
  moviesitNickname?: string;
  age?: number;
  about?: string;
  socialMedias?: ProfileSocialMedia;
  deposition?: Deposition[]
}
