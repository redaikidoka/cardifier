export interface Chat {
  idGame: string;
  idUser: string;
  userName: string;
  message: string;
  when: Date;
  systemText?: string;
}

export interface GameChats {
  chats: Chat[];
  lastMessage: Date;
}
