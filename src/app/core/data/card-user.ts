export interface CardUser {
  idUser: string;

  userEmail: string;
  userName: string;

  imageUrl?: string;
  imageLink?: string;
  hoursPlayed: number;

  isActive: boolean;

  tags?: string;
  userPreferences?: object;

  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: string;
  sIdUserUpdate?: string;

  idUserType: number;

  userTypeTitle?: string;
  userTypeNotes?: string;

  games?: string[];
}


