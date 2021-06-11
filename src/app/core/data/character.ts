import {Hand} from './game';

export interface Character {
  idCharacter: number;
  characterName: string;

  idGame: number; // parent
  idUser: number; // owner of the character
  sCreate: Date;
  sUpdate: Date;
  sIdUserCreate?: number;
  sIdUserUpdate?: number;

  hands?: Hand[];
}
