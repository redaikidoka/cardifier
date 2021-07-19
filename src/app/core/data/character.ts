import {Hand} from './game';

export interface CharacterList {
  idCharacter: string;
  idUser: string;
}

export interface Character {
  idCharacter: string;
  characterName: string;
  characterDescription?: string;

  idGame: string; // parent
  idUser: string; // owner of the character
  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: number;
  sIdUserUpdate?: number;

  hands: Hand[];
}
