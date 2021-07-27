import {Injectable} from '@angular/core';
import {Character, CharacterList} from '../core/data/character';
import {forkJoin, Observable, of} from 'rxjs';
import {Game} from '../core/data/game';
import {map, mergeMap, take, tap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {


  constructor(private db: AngularFireDatabase) {
  }

  getCharacter$(idCharacter: string): Observable<Character> {
    let ourCharacter: Character = {} as Character;
    // return of(this.faker);

    return this.db.list<Character>('/characters', ref => ref.orderByKey().equalTo(idCharacter)).valueChanges().pipe(
      // tap(character => console.log('character.service::getCharacter$', idCharacter, character)),
      map(characters => characters[0] ?? null),
      tap(character => ourCharacter = character),
      tap(character => console.log('character.service::getCharacter$ singleton', character)),
      // mergeMap(character => {
      //   return this.gameService.getHand$('44');
      // }),
      // map( hand44 => {
      //   if (ourCharacter.hands) {
      //   ourCharacter.hands.push(hand44);
      //   } else {
      //     ourCharacter.hands = [hand44];
      //   }
      //
      //   return ourCharacter;
      // })
    );
  }

  getGameCharacter(idGame: number, idUser: number): Observable<Character> {
    return of(this.getFaker());
  }

  getCharacters$(theList: CharacterList[]): Observable<Character[]> {
    const characterObservables: Observable<any>[] = [];

    theList?.forEach((cl: CharacterList) => {
      characterObservables.push(this.getCharacter$(cl.idCharacter).pipe(take(1)));
    });

    console.log('character.service::getCharacters$ -> character fetch observables', characterObservables);

    // if (characterObservables.length > 0) {
    // return forkJoin(characterObservables).pipe(
    //     map(characters => {
    //       console.log('Game.service getGame$ -> getcharacter() forkjoin', characters);
    //       game.characters = characters;
    //       ourGame.characters = characters;
    //
    //       return ourGame;
    //     })
    //   );
    // }
    // return game;
    return forkJoin(characterObservables).pipe(
      tap(characters => console.log('character.service::getCharacters$ forked', characters))
      // map(characters => ({theGame, characters}))
    );
  }

  getFaker(): Character {
    const faker = {
      idCharacter: '32',
      characterName: 'Dolores/Static',
      idGame: '8323',
      idUser: 'dael',
      sCreate: new Date('2021-06-09'),
      sUpdate: new Date('2021-06-09'),
      hands: [
        {
          idHand: '33333',
          handType: 'grid',
          handTitle: 'Traits',
          handState: 'Condensed',
          groupAddable: false,
          cards: [
            {
              idCard: '333331',
              idHand: '33333',
              cardTitle: 'Might',
              description: 'Used for strength and resistance',
              cardType: 'pool',
              dieRoll: 'd6',
              poolValue: 11,
              currentValue: 9
            }, {
              idCard: '333332',
              idHand: '33333',
              cardTitle: 'Speed',
              description: 'Used for moving, dodging',
              cardType: 'pool',
              dieRoll: 'd6',
              poolValue: 10,
              currentValue: 10
            }, {
              idCard: '333333',
              idHand: '33333',
              cardTitle: 'Intellect',
              description: 'Used for thinking, figuring, charming',
              cardType: 'pool',
              dieRoll: 'd6',
              poolValue: 13,
              currentValue: 11
            },
          ]

        }, {
          idHand: '44',

          handType: 'stack',
          handTitle: 'Abilities',
          handState: 'Condensed',

          groupAddable: false,
          cards: [
            {
              idCard: '441',
              idHand: '44',
              cardTitle: 'Far Step',
              description: 'short-range teleport',
              cardType: 'action',
              customProperties: {stat: 'Intellect', cost: 2, page: 136}
            }, {
              idCard: '442',
              idHand: '44',
              cardTitle: 'Resonance Field',
              description: 'protective shield',
              cardType: 'action',
              customProperties: {stat: 'Intellect', cost: 2}
            },
          ]
        }, {
          idHand: '45',

          handType: 'dropdown',
          handTitle: 'Recoveries',
          handState: 'Closed',

          groupAddable: false,
          cards: [
            {
              idCard: 'action1',
              idHand: '45',
              cardTitle: 'Action',
              cardType: 'action',
              dieRoll: '1d6 + {Tier}',
              faceColor: 'green'
            }, {
              idCard: '10min',
              idHand: '45',
              cardTitle: '10 Minutes',
              cardType: 'action',
              dieRoll: '1d6 + {Tier}',
            }, {
              idCard: '1hr',
              idHand: '45',
              cardTitle: '1 Hour',
              cardType: 'action',
              dieRoll: '1d6 + {Tier}',
            }, {
              idCard: '10hr',
              idHand: '45',
              cardTitle: '10 Hours',
              cardType: 'action',
              dieRoll: '1d6 + {Tier}',
            },

          ]
        }]
    } as Character;

    return faker;
  }
}
