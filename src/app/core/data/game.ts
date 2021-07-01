import {Character, CharacterList} from './character';

export interface Game {
  idGame: string;

  gameTitle: string;

  imageUrl?: string;
  iconUrl?: string;
  imageLink?: string;
  hoursPlayed: number;

  isActive: boolean;

  tags?: string;

  nextGame?: Date;

  lastPlayed?: Date;

  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: number;
  sIdUserUpdate?: number;

  idSystem?: number;
  systemName?: string;

  idCurrentSession?: string;

  characterList?: CharacterList[];

  // lookups
  currentSession?: GameSession;
  gameArea?: GameArea;
  playArea?: GameArea;

  // added bits
  areas?: GameArea[];
  sessions?: GameSession[];
  characters?: Character[];

}

export interface GameSession {
  idSession: string;

  sessionNumber: number;
  sessionTitle: string;
  when: Date;
  length: number;

  imageUrl?: string;

  hands?: Hand[];
}

export enum GameAreaType {
  Game,
  Play
}
export interface GameArea {
  idArea: string;

  idGame: string; // parent

  areaTitle: string;
  areaId?: GameAreaType;

  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: number;
  sIdUserUpdate?: number;

  hands?: Hand[];
}

export type HandState = 'Open' | 'Condensed' | 'Closed' | 'Hidden' | '';

export interface Hand {
  idHand: string;

  idArea?: string; // parent?

  handType: string;
  handTitle: string;

  iconUrl?: string;
  imageUrl?: string;

  handState: HandState;
  tags?: string;

  groupAddable?: boolean;

  cards?: Card[];
}

export interface Card {
  idCard: string;

  idHand: string;

  cardTitle: string;
  description?: string;

  cardIcon?: string;
  faceImage?: string;
  backImage?: string;

  faceColor?: string;
  backColor?: string;

  headerText?: string;
  footerText?: string;

  cardType?: string;

  tags?: string;

  // rollable
  dieRoll?: string; // e.g. '2d6+1'

  poolValue?: number;
  currentValue?: number;


  customProperties?: Map<string, number>;
}
