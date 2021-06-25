export interface Chat {
  idGame: string;
  idUser: string;
  message: string;
  when: Date;
  systemText?: string;
}
