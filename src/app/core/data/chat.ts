export interface Chat {
  idGame: string;
  idUser: string;
  userName: string;
  message: string;
  when: number;
  systemText?: string;
}

export interface GameChats {
  chats: Chat[];
  lastMessage: Date;
}
