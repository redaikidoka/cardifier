import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Game, GameSession, GameArea} from '../core/data/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {
  }

  getUserGames$(idUser: number): Observable<Game[]> {
    const fakeGames = [
      {
        idGame: 8323,
        gameTitle: 'A Time for Masks',
        imageUrl: 'http://rpg.simplecommunion.com/tfm/itunes.jpg',
        hoursPlayed: 39,
        isActive: true,
        nextGame: new Date('2021-06-01'),
        sCreate: new Date('2021-01-28'),
        sUpdate: new Date('2021-04-19'),
        idSystem: 23,
        systemName: 'Cypher*',
      },
      {
        idGame: 398,
        gameTitle: 'Arcodd: A Marriage of Serpents',
        imageUrl: 'http://rpg.simplecommunion.com/mos/mos.jpg',
        hoursPlayed: 198,
        isActive: true,
        sCreate: new Date('2019-12-18'),
        sUpdate: new Date('2021-04-19'),
        idSystem: 383,
        systemName: 'City of Mist*',
      },
      {
        idGame: 19,
        gameTitle: 'Exalted: A Fire in Heaven',
        imageUrl: 'http://rpg.simplecommunion.com/',
        hoursPlayed: 198,
        isActive: false,
        sCreate: new Date('2014-5-13'),
        sUpdate: new Date('2016-3-11'),
        idSystem: 383,
        systemName: 'Exalted, 2nd Edition',
      },
    ];

    return of(fakeGames);
  }

  getGame$(idGame: number): Observable<Game> {
    const gameAreas = [
      {
        idArea: 222,
        idGame: 8323,
        areaTitle: 'Game',
        sCreate: new Date('2021-06-07'),
        sUpdate: new Date('2021-06-07')

      }, {
        idArea: 223,
        idGame: 8323,
        areaTitle: 'Play',
        sCreate: new Date('2021-06-07'),
        sUpdate: new Date('2021-06-07')
      }
    ] as GameArea[];

    const gameSessions = [{
      idSession: 138343,
      sessionNumber: 12,
      sessionTitle: '12: Gig is Up',
      when: new Date('2021-06-01'),
      length: 3,
      hands: [
        {
          idHand: 11,
          idArea: 138343,
          handType: '?',
          handTitle: 'Support',
          cards: [
            {
              idCard: 1111,
              idHand: 11,
              cardTitle: 'Ally: Shiori',
              cardType: 'simple'
            }

          ]
        }
      ]
    }, {
      idSession: 138343,
      sessionNumber: 11,
      sessionTitle: '11: Raggedy',
      when: new Date('2021-05-24'),
      length: 3.5,
      hands: [
        {
          idHand: 11,
          idArea: 138343,
          handType: '?',
          handTitle: 'Reference',
          cards: [
            {
              idCard: 1111,
              idHand: 11,
              cardTitle: 'Paraclipse: Shiori',
              cardType: 'simple'
            }

          ]
        }
      ]
    }] as GameSession[];

    const fake = {
      idGame: 8323,
      gameTitle: 'A Time for Masks',
      imageUrl: 'http://rpg.simplecommunion.com/tfm/itunes.jpg',
      hoursPlayed: 42,
      isActive: true,
      nextGame: new Date('2021-06-01'),
      sCreate: new Date('2021-01-28'),
      sUpdate: new Date('2021-04-19'),

      idSystem: 23,
      systemName: 'Cypher*',


      currentSessionId: 138343,
      areas: gameAreas,
      sessions: gameSessions,
      hands: [
        {}
      ]
    } as Game;

    return of(fake);
  }
}
