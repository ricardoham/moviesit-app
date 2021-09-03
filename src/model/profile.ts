export interface Deposition {
  _id?: string;
  id?: string;
  depositionUserId?: string;
  createdBy?: string;
  talk?: string;
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
  userId?: string;
  name?: string;
  moviesitNickname?: string;
  age?: number;
  about?: string;
  socialMedias?: ProfileSocialMedia;
  deposition?: Deposition[]
}
