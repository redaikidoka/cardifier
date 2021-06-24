import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Game, GameSession, GameArea, GameAreaType} from '../core/data/game';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private db: AngularFireDatabase) {
  }

  getUserGames$(idUser: string): Observable<Game[]> {
    console.log('Game.Service::getUserGames$ for', idUser);

    return this.db.list<Game>('games', ref => ref.orderByChild('idUser').equalTo(idUser)).valueChanges().pipe(
      // tap(gg => console.log('Game.Service::getUserGames$', gg)),
      map(games => games.sort((a, b) => (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1)),
      tap(games => console.log('sorted: ', games))
    );

  }

  getGame$(idGame: string): Observable<Game> {
    return this.db.list<Game>('games', ref => ref.orderByKey().equalTo(idGame)).valueChanges().pipe(
      tap(games => console.log('Game.service::getGame$[]', idGame, games)),
      map(games => games[0] ?? null),
      tap(game => console.log('Game.service::getGame$ singleton', game)),
      map(
        // the session
        game => {
          if (game?.idCurrentSession) {
            game.currentSession = game.sessions?.find(s => s.idSession === game.idCurrentSession);
            if (!game.currentSession) {
              console.error('game.service::getGame$ - current session not found', game?.idCurrentSession);
            }
          }

          // AREA: game (game.gameArea)
          if (game.areas) {
            console.log('game.service::getGame$ areas', game.areas);
            game.gameArea = game.areas.find(a => a.areaId === GameAreaType.Game);
            // AREA: Play (game.playArea)
            game.playArea = game.areas.find(a => a.areaId === GameAreaType.Play);
          }


          if (game.areas) {

          }

          console.log('game.service::getGame$ game setup', game);
          return game;
        }
      ),
      tap(game => console.log('Game.service::getGame$ filtered', idGame, game))
    );
  }

  getFakeGame(): Game {
    const gameAreas = [
      {
        idArea: '222',
        idGame: '8323',
        areaTitle: 'Game',
        sCreate: new Date('2021-06-07'),
        sUpdate: new Date('2021-06-07')

      }, {
        idArea: '223',
        idGame: '8323',
        areaTitle: 'Play',
        sCreate: new Date('2021-06-07'),
        sUpdate: new Date('2021-06-07')
      }
    ] as GameArea[];

    const gameSessions = [{
      idSession: '138343',
      sessionNumber: 12,
      sessionTitle: '12: Gig is Up',
      when: new Date('2021-06-01'),
      length: 3,
      hands: [
        {
          idHand: '11',
          idArea: '138343',
          handType: '?',
          handTitle: 'Support',
          cards: [
            {
              idCard: '1111',
              idHand: '11',
              cardTitle: 'Ally: Shiori',
              cardType: 'simple'
            }

          ]
        }
      ]
    }, {
      idSession: '138343',
      sessionNumber: 11,
      sessionTitle: '11: Raggedy',
      when: new Date('2021-05-24'),
      length: 3.5,
      hands: [
        {
          idHand: '11',
          idArea: '138343',
          handType: '?',
          handTitle: 'Reference',
          cards: [
            {
              idCard: '1111',
              idHand: '11',
              cardTitle: 'Paraclipse: Shiori',
              cardType: 'simple'
            }

          ]
        }
      ]
    }] as GameSession[];

    const fake = {
      idGame: '8323',
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

    return fake;
  }
}
