import {Injectable} from '@angular/core';
import {Character} from '../core/data/character';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  faker = {
    idCharacter: 32,
    characterName: 'Dolores/Static',
    idGame: 8323,
    idUser: -1,
    sCreate: new Date('2021-06-09'),
    sUpdate: new Date('2021-06-09'),
    hands: [{
      idHand: 33333,
      handType: 'grid',
      handTitle: 'Traits',
      handState: 'Condensed',
      groupAddable: false,
      cards: [
        {
          idCard: 333331,
          idHand: 33333,
          cardTitle: 'Might',
          description: 'Used for strength and resistance',
          cardType: 'pool',
          dieRoll: 'd6',
          poolValue: 11,
          currentValue: 9
        }, {
          idCard: 333332,
          idHand: 33333,
          cardTitle: 'Speed',
          description: 'Used for moving, dodging',
          cardType: 'pool',
          dieRoll: 'd6',
          poolValue: 10,
          currentValue: 10
        }, {
          idCard: 333333,
          idHand: 33333,
          cardTitle: 'Intellect',
          description: 'Used for thinking, figuring, charming',
          cardType: 'pool',
          dieRoll: 'd6',
          poolValue: 13,
          currentValue: 11
        },
      ]

    }, {
      idHand: 44,

      handType: 'stack',
      handTitle: 'Abilities',
      handState: 'Condensed',

      groupAddable: false,
      cards: [
        {
          idCard: 441,
          idHand: 44,
          cardTitle: 'Far Step',
          description: 'short-range teleport',
          cardType: 'action',
          customProperties: {stat: 'Intellect', cost: 2, page: 136}
        }, {
          idCard: 442,
          idHand: 44,
          cardTitle: 'Resonance Field',
          description: 'protective shield',
          cardType: 'action',
          customProperties: {stat: 'Intellect', cost: 2}
        },
      ]
    }, {
      idHand: 45,

      handType: 'dropdown',
      handTitle: 'Recoveries',
      handState: 'Closed',

      groupAddable: false,
      cards: [
        {
          idCard: 451,
          idHand: 45,
          cardTitle: 'Action',
          cardType: 'action',
          dieRoll: '1d6 + {Tier}',
          faceColor: 'green'
        }, {
          idCard: 451,
          idHand: 45,
          cardTitle: '10 Minutes',
          cardType: 'action',
          dieRoll: '1d6 + {Tier}',
        }, {
          idCard: 451,
          idHand: 45,
          cardTitle: '1 Hour',
          cardType: 'action',
          dieRoll: '1d6 + {Tier}',
        }, {
          idCard: 451,
          idHand: 45,
          cardTitle: '10 Hours',
          cardType: 'action',
          dieRoll: '1d6 + {Tier}',
        },

      ]
    }]
  } as Character;

  constructor() {
  }

  getCharacter$(idCharacter: number): Observable<Character> {

    return of(this.faker);
  }

  getGameCharacter(idGame: number, idUser: number): Observable<Character> {
    return of(this.faker);
  }
}
