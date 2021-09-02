export interface Talk {
  id?: string;
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
  id?: string;
  name?: string;
  nickname?: string;
  age?: number;
  about?: string;
  socialMedia?: ProfileSocialMedia;
  talk?: Talk[]
}
