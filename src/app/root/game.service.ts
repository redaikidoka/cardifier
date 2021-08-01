import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Game, GameSession, GameArea, GameAreaType, Hand} from '../core/data/game';
import {AngularFirestore} from '@angular/fire/firestore';
import {concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {CharacterService} from './character.service';
import {Character, CharacterList} from '../core/data/character';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private afs: AngularFirestore, private characterService: CharacterService, private auth: AuthService) {
  }

  getCurrentUserGames$(): Observable<Game[]> {
    const gameList = this.auth.me().games;

    if (!gameList) {
      console.log('Game.service::getCurrentUserGames$ - no games');
      return of([] as Game[]);
    }

    return this.afs.collection<Game>('games', ref => ref.where('idGame', 'in', gameList)).valueChanges().pipe(
      tap(games => console.log('Game.Service::getCurrentUserGames$ for ', this.auth.me().userName, games)),
      map( games =>  games ? games.sort((a, b) => (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1) : [] as Game[]),
    );
  }

  getUserGames$(idUser: string): Observable<Game[]> {

    return this.afs.collection<Game>('games', ref => ref.where('idUser', '==', idUser)).valueChanges().pipe(
      tap(games => console.log('Game.Service::getUserGame$ for ', idUser, games)),
      map( games =>  games ? games.sort((a, b) => (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1) : [] as Game[]),
    );
  }

  getGame$(idGame: string, idUserOnly: string = ''): Observable<Game | undefined> {
    let ourGame: Game | undefined;

    return this.afs.doc<Game>(`games/${idGame}`).valueChanges().pipe(
      // tap(game => console.log('Game.service::getGame$', idGame, game)),
      map(game => {
          // AREA: game (game.gameArea)
          if (game?.areas) {
            console.log('game.service::getGame$ areas', game.areas);
            // @ts-ignore
            game?.gameArea = game.areas.find(a => a.areaId === GameAreaType.Game);
            // AREA: Play (game.playArea)
            // @ts-ignore
            game?.playArea = game.areas.find(a => a.areaId === GameAreaType.Play);
          }

          // console.log('game.service::getGame$ game setup', game);
          ourGame = game;
          return game;
        }
      ),
      mergeMap(() => {
        if (ourGame?.characterList) {
          if (idUserOnly) {
            const myCharacters = ourGame.characterList.filter(cl => cl.idUser === idUserOnly);
            // console.log('game.Service::getGame$ - idUserOnly', idUserOnly, myCharacters);

            if (!myCharacters || myCharacters.length < 1) { return of([] as Character[]); }
            return this.characterService.getCharacters$(myCharacters);
          } else {
            return this.characterService.getCharacters$(ourGame.characterList);
          }
        } else {
          return of([] as Character[]);
        }

      }),
      map(characters => {
        // @ts-ignore
        ourGame.characters = characters;
        return ourGame;
      }),
      mergeMap(() => {
        // the session

        if (ourGame?.idCurrentSession) {
          return this.getGameSession$(ourGame.idGame, ourGame.idCurrentSession);
        } else {
          console.error('game.service::getGame$ - current session not found', ourGame?.idCurrentSession);
          return of(undefined);
        }
      }),
      map(session => {
          // @ts-ignore
          ourGame.currentSession = session;
          return ourGame;
        }
      ),
      tap(game => console.log('Game.service::getGame$ FINAL', idGame, game))
    ) ;

  }


  createHand(game: Game, hand: Hand): Observable<any> {
    if (game.hands) {
      game.hands.push(hand);
    } else {
      game.hands = [hand];
    }

    return of(game);
  }

  getGameSession$(idGame: string, idSession: string): Observable<GameSession | undefined> {
    return this.afs.collection('games').doc(idGame).collection('sessions').doc<GameSession>(idSession).valueChanges();
  }
}
