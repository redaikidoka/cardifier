export interface Game {
  idGame: number;

  idGameSystem?: number;

  gameTitle: string;

  imageUrl?: string;
  imageLink?: string;
  hoursPlayed: number;

  isActive: boolean;

  tags?: string;

  nextGame?: Date;

  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: number;
  sIdUserUpdate?: number;

  idSystem?: number;
  systemName?: string;
}
