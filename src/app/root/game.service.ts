import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Game, GameSession, GameArea, GameAreaType, Hand} from '../core/data/game';
import {AngularFirestore} from '@angular/fire/firestore';
import {concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {CharacterService} from './character.service';
import {Character, CharacterList} from '../core/data/character';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private afs: AngularFirestore, private characterService: CharacterService) {
  }

  getUserGames$(idUser: string): Observable<Game[]> {
    console.log('Game.Service::getUserGames$ for', idUser);

    return this.afs.collection<Game>('games', ref => ref.where('idUser', '==', idUser).orderBy('lastPlayed', 'desc')).valueChanges().pipe(
      tap(games => console.log('sorted: ', games))
    );

    // return this.db.list<Game>('games', ref => ref.orderByChild('idUser').equalTo(idUser)).valueChanges().pipe(
    //   // tap(gg => console.log('Game.Service::getUserGames$', gg)),
    //   map(games => games.sort((a, b) => (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1)),
    //   tap(games => console.log('sorted: ', games))
    // );

  }

  getGame$(idGame: string): Observable<Game | undefined> {
    let ourGame: Game;

    return this.afs.doc<Game>(`games/${idGame}`).valueChanges().pipe(
      tap(game => console.log('Game.service::getGame$[]', idGame, game)),
      map(
            // the session
            game => {
              if (!game) {return game; }
              if (game?.idCurrentSession) {
                game.currentSession = game.sessions?.find(s => s.idSession === game.idCurrentSession);
                if (!game.currentSession) {
                  console.error('game.service::getGame$ - current session not found', game?.idCurrentSession);
                }
              }

              // AREA: game (game.gameArea)
              if (game?.areas) {
                console.log('game.service::getGame$ areas', game.areas);
                // @ts-ignore
                game?.gameArea = game.areas.find(a => a.areaId === GameAreaType.Game);
                // AREA: Play (game.playArea)
                // @ts-ignore
                game?.playArea = game.areas.find(a => a.areaId === GameAreaType.Play);
              }



              console.log('game.service::getGame$ game setup', game);
              ourGame = game;
              return game;
            }
          ),
          mergeMap(() => ourGame.characterList ? this.characterService.getCharacters$(ourGame.characterList) : of([] as Character[])),
          map(characters => {
            ourGame.characters = characters;
            return ourGame;
          }),
          tap(game => console.log('Game.service::getGame$ FINAL', idGame, game))
    );

    // TODO: get current session
    // TODO: load characters

    // // tslint:disable-next-line:label-position
    // let ourGame: Game = {} as Game;
    //
    // return this.db.list<Game>('games', ref => ref.orderByKey().equalTo(idGame)).valueChanges().pipe(
    //   tap(games => console.log('Game.service::getGame$[]', idGame, games)),
    //   map(games => games[0] ?? null),
    //   // tap(game => console.log('Game.service::getGame$ singleton', game)),
    //   map(
    //     // the session
    //     game => {
    //       if (game?.idCurrentSession) {
    //         game.currentSession = game.sessions?.find(s => s.idSession === game.idCurrentSession);
    //         if (!game.currentSession) {
    //           console.error('game.service::getGame$ - current session not found', game?.idCurrentSession);
    //         }
    //       }
    //
    //       // AREA: game (game.gameArea)
    //       if (game.areas) {
    //         console.log('game.service::getGame$ areas', game.areas);
    //         game.gameArea = game.areas.find(a => a.areaId === GameAreaType.Game);
    //         // AREA: Play (game.playArea)
    //         game.playArea = game.areas.find(a => a.areaId === GameAreaType.Play);
    //       }
    //
    //
    //       if (game.areas) {
    //
    //       }
    //
    //       console.log('game.service::getGame$ game setup', game);
    //       ourGame = game;
    //       return game;
    //     }
    //   ),
    //   mergeMap(() =>
    //     ourGame.characterList ? this.characterService.getCharacters$(ourGame.characterList) : of([] as Character[])),
    //   map(characters => {
    //     ourGame.characters = characters;
    //     return ourGame;
    //   }),
    //   tap(game => console.log('Game.service::getGame$ FINAL', idGame, game))
    // );
  }


  createHand(game: Game, hand: Hand): Observable<any> {
    if (game.hands) {
      game.hands.push(hand);
    } else {
      game.hands = [hand];
    }

    return of(game);
  }

}
