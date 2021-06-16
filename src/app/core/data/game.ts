export interface Game {
  idGame: string;

  idGameSystem?: number;

  gameTitle: string;

  imageUrl?: string;
  iconUrl?: string;
  imageLink?: string;
  hoursPlayed: number;

  isActive: boolean;

  tags?: string;

  nextGame?: Date;

  lastPlayed?: Date;

  // sCreate: Date;
  // sUpdate: Date;
  // sIdUserCreate?: number;
  // sIdUserUpdate?: number;

  idSystem?: number;
  systemName?: string;

  idCurrentSession?: string;
  currentSession?: GameSession;
  // added bits
  areas?: GameArea[];
  sessions?: GameSession[];

}

export interface GameSession {
  idSession: string;

  sessionNumber: number;
  sessionTitle: string;
  when: Date;
  length: number;

  hands?: Hand[];
}

export interface GameArea {
  idArea: string;

  idGame: string; // parent

  areaTitle: string;

  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: number;
  sIdUserUpdate?: number;

  hands?: Hand[];
}

export type HandState = 'Open' | 'Condensed' | 'Closed' | 'Hidden';

export interface Hand {
  idHand: string;

  idArea?: string; // parent?

  handType: string;
  handTitle: string;

  handState: HandState;

  groupAddable: boolean ;

  cards?: Card[];
}

export interface Card {
  idCard: string;

  idHand: string;

  cardTitle: string;
  description?: string;

  faceImage?: string;
  backImage?: string;

  faceColor?: string;
  backColor?: string;

  headerText?: string;
  footerText?: string;

  cardType?: string;

  // rollable
  dieRoll?: string; // e.g. '2d6+1'

  poolValue?: number;
  currentValue?: number;


  customProperties?: Map<string, number>;
}
