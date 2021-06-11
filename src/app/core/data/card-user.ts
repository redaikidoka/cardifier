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
  sIdUserCreate?: number;
  sIdUserUpdate?: number;

  idUserType: number;
  userTypeTitle?: string;
  userTypeNotes?: string;
}
