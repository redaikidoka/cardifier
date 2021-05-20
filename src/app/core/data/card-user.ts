export interface CardUser {
  idApp: number;
  idUser: number;

  userEmail: string;
  userName: string;
  imageUrl?: string;
  imageLink?: string;
  userScore: number;

  isActive: boolean;

  tags?: string;
  userPreferences?: object;

  sCreate: Date;
  sUpdate: Date;
  sCreateUser?: number;
  sUpdateUser?: number;


  idUserType: number;
    userTypeTitle?: string;
    userTypeNotes?: string;

}
