import {Character, CharacterList} from './character';

export interface Game {
  idGame: string;
  idUser: string;
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
  sIdUserCreate?: string;
  sIdUserUpdate?: string;

  idSystem?: number;
  systemName?: string;

  idCurrentSession?: string;

  characterList?: CharacterList[];

  hands?: Hand[];

  users?: string[];

  // sub-collections
  areas?: GameArea[];
  sessions?: GameSession[];
  characters?: Character[];


  // lookups
  currentSession?: GameSession;
  gameArea?: GameArea;
  playArea?: GameArea;


}

export interface GameSession {
  idSession: string;

  sessionNumber: number;
  sessionTitle: string;
  when: Date;
  length: number;

  imageUrl?: string;

  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: string;
  sIdUserUpdate?: string;

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
  sIdUserCreate?: string;
  sIdUserUpdate?: string;

  hands: Hand[];
}

export type HandState = 'Open' | 'Condensed' | 'Closed' | 'Hidden' | '';

export const AREA_CURRENT_ID = 'current';

export interface Hand {
  idHand: string;
  order: number;

  idGame: string;
  idArea?: string; // parent?

  handType: string;
  handTitle: string;

  handDescription?: string;

  iconUrl?: string;
  imageUrl?: string;

  handState: HandState;
  tags?: string;


  groupAddable?: boolean;

  cards: Card[];
  // used in dropdown cards
  currentIdCard?: string;
}

export interface Card {
  idCard: string;
  order?: number;

  idHand: string;

  cardTitle: string;
  cardShortTitle?: string;
  description?: string;

  cardIcon?: string;
  faceImage?: string;
  backImage?: string;

  faceColor?: string;
  textColor?: string;
  backColor?: string;

  headerText?: string;
  footerText?: string;

  cardType?: string;

  tags?: string;

  // rollable
  dieRoll?: string; // e.g. '2d6+1'
  rollResults?: DieRollResults;

  poolValue?: number;
  currentValue?: number;


  customProperties?: Map<string, number>;
}


export enum DieRollResults {
  sum = 'Dice Total',
  successes = 'Success Count',
  list = 'List of Dice'
}
