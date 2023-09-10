import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Character, CharacterList } from '../core/data/character';
import {
  Game,
  GameSession,
  GameArea,
  GameAreaType,
  Hand,
  Card,
  HAND_ID_CURRENT,
} from '../core/data/game';

import { CharacterService } from './character.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HandService } from './hand.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private afs: AngularFirestore,
    private characterService: CharacterService,
    private auth: AuthService,
    private userService: UserService,
    private handService: HandService
  ) {}

  private getCurrentHand(area: GameArea): Hand {
    const currentHand = {
      idHand: HAND_ID_CURRENT,
      order: 10000,
      idGame: area.idGame,
      idArea: area.idArea,
      handType: 'current',
      handTitle: 'Current Effects',
      handDescription: 'Player and Scene FX go here',
      handState: 'Open',
      cards: [
        {
          idCard: 'base',
          order: 0,
          idHand: HAND_ID_CURRENT,
          cardTitle: 'Add Player FX Here',
          description: 'Click the hand to close',
          faceColor: 'bg-red-500',
          tags: 'frangible',
        } as Card,
      ],
    } as Hand;

    return currentHand;
  }

  private getCurrentHandbyIds(idGame: string, idArea: string): Hand {
    const currentHand = {
      idHand: HAND_ID_CURRENT,
      order: 10000,
      idGame: idGame,
      idArea: idArea,
      handType: 'current',
      handTitle: 'Current Effects',
      handDescription: 'Player and Scene FX go here',
      handState: 'Open',
      cards: [
        {
          idCard: 'base',
          order: 0,
          idHand: HAND_ID_CURRENT,
          cardTitle: 'Add Player FX Here',
          description: 'Click the hand to close',
          faceColor: 'bg-red-500',
          tags: 'frangible',
        } as Card,
      ],
    } as Hand;

    return currentHand;
  }
  getCurrentUserGames$(): Observable<Game[]> {
    const gameList = this.auth.me().games;

    if (!gameList) {
      console.log('Game.service::getCurrentUserGames$ - no games');
      return of([] as Game[]);
    }

    return this.afs
      .collection<Game>('games', (ref) => ref.where('idGame', 'in', gameList))
      .valueChanges()
      .pipe(
        tap((games) =>
          console.log(
            'Game.Service::getCurrentUserGames$ for ',
            this.auth.me().userName,
            games
          )
        ),
        map((games) =>
          games
            ? games.sort((a, b) =>
                (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1
              )
            : ([] as Game[])
        )
      );
  }

  getUserGames$(idUser: string): Observable<Game[]> {
    return this.afs
      .collection<Game>('games', (ref) => ref.where('idUser', '==', idUser))
      .valueChanges()
      .pipe(
        tap((games) =>
          console.log('Game.Service::getUserGame$ for ', idUser, games)
        ),
        map((games) =>
          games
            ? games.sort((a, b) =>
                (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1
              )
            : ([] as Game[])
        )
      );
  }

  getGame$(idGame: string, idUserOnly = ''): Observable<Game | undefined> {
    let ourGame: Game | undefined;

    return this.afs
      .doc<Game>(`games/${idGame}`)
      .valueChanges()
      .pipe(
        tap((game) =>
          console.log('Game.service::getGame$', idGame, game, idUserOnly)
        ),
        tap((game) => {
          console.log('- Game.service::getGames$ - cache users', game?.users);
          if (game?.users) {
            this.userService.cacheUsers(game?.users);
          } else {
            console.warn('- g.s::getGames - no users to cache');
          }
        }),
        map((game) => {
          // AREA: game (game.gameArea)
          if (game?.areas) {
            console.log('- game.service::getGame$ areas', game.areas);
            game.gameArea = game.areas.find(
              (a) => a.areaId === GameAreaType.Game
            );

            // AREA: Play (game.playArea)
            game.playArea = game.areas.find(
              (a) => a.areaId === GameAreaType.Play
            );
            if (!game.playArea) {
              this.createPlayArea(game);
              //   .then( (docRef: DocumentReference) =>
              //   console.error('LOOK AT ME!!!! I do not know how this works!');
              // );
            }
            if (game.playArea) {
              this.createAreaCurrentHand(game, game.playArea);
            }
          }

          // console.log('game.service::getGame$ game setup', game);
          ourGame = game;
          return game;
        }),
        mergeMap(() => {
          console.log('- game.service::getGame$ - checking character list');
          if (ourGame?.characterList) {
            if (idUserOnly) {
              const myCharacters = ourGame.characterList.filter(
                (cl) => cl.idUser === idUserOnly
              );
              console.log(
                '- game.Service::getGame$ - idUserOnly',
                idUserOnly,
                myCharacters
              );

              if (!myCharacters || myCharacters.length < 1) {
                console.warn(
                  '- game.Service::getGame$ - no characters for this user!'
                );
                return of([] as Character[]);
              }
              return this.characterService.getCharacters$(myCharacters, idGame);
            } else {
              return this.characterService.getCharacters$(
                ourGame.characterList,
                idGame
              );
            }
          } else {
            return of([] as Character[]);
          }
        }),
        map((characters) => {
          console.log('Game.service::fetched characters', characters);
          // @ts-ignore
          ourGame.characters = characters;
          return ourGame;
        }),
        mergeMap(() => {
          // the session

          if (ourGame?.idCurrentSession) {
            return this.getGameSession$(
              ourGame.idGame,
              ourGame.idCurrentSession
            );
          } else {
            console.error(
              '- game.service::getGame$ - current session not found',
              ourGame?.idCurrentSession
            );
            return of(undefined);
          }
        }),
        map((session) => {
          // @ts-ignore
          ourGame.currentSession = session;
          return ourGame;
        }),
        tap((game) =>
          console.log('=Game.service::getGame$ FINAL', idGame, game)
        )
      );
  }

  createAreaCurrentHand(
    game: Game,
    area: GameArea
  ): Observable<Hand | undefined> {
    if (game && area && area.hands) {
      // check to see if it's there!
      if (area.hands.some((hand) => hand.idHand === HAND_ID_CURRENT)) {
        return of(area.hands.find((hand) => hand.idHand === HAND_ID_CURRENT));
      }
    }

    if (!area.hands) {
      area.hands = [];
    }
    const currentHand = this.getCurrentHand(area);

    return from(this.handService.addGameAreaHand(game, area, currentHand)).pipe(
      tap((returned) => console.log('returned value', returned)),
      map((res) => {
        area.hands?.push(currentHand);
        return currentHand;
      })
    );
    //
    // .then(
    //   () => {
    //     area.hands?.push(currentHand);
    //     return of(currentHand);
    //   }
    // )
    // .catch(err => {
    //   console.log('game.service::createAreaCurrentHand failed', err);
    //   return of({} as Hand);
    // });
  }

  // createHand(game: Game, hand: Hand): Observable<any> {
  //   if (game.hands) {
  //     game.hands.push(hand);
  //   } else {
  //     game.hands = [hand];
  //   }
  //
  //   return of(game);
  // }

  getGameSession$(
    idGame: string,
    idSession: string
  ): Observable<GameSession | undefined> {
    return this.afs
      .collection('games')
      .doc(idGame)
      .collection('sessions')
      .doc<GameSession>(idSession)
      .valueChanges();
  }

  // make a play area on the game!
  createPlayArea(game: Game): Promise<GameArea> {
    if (game.playArea) {
      return Promise.resolve(game.playArea);
    }

    const newPlayArea: GameArea = {
      idArea: 'Play',
      idGame: game.idGame,
      areaTitle: 'Play',
      areaId: GameAreaType.Play,
      sIdUserCreate: this.auth.myId(),
      hands: [this.getCurrentHandbyIds(game.idGame, 'Play')],
    };

    newPlayArea.hands = [this.getCurrentHand(newPlayArea)];

    return this.afs
      .collection('games')
      .doc(game.idGame)
      .collection('areas')
      .add(newPlayArea)
      .then()
      .catch() as Promise<GameArea>;
  }
}
