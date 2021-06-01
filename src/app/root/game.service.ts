import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Game } from '../core/data/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  getUserGames$(idUser: number): Observable<Game[]> {
    const fakeGames = [
      {
        idGame: 8323,
        gameTitle: 'A Time for Masks',
        imageUrl: 'http://rpg.simplecommunion.com/tfm/itunes.jpg',
        hoursPlayed: 39,
        isActive: true,
        sCreate: new Date('2021-01-28'),
        sUpdate: new Date('2021-04-19'),
      },
      {
        idGame: 398,
        gameTitle: 'Arcodd: A Marriage of Serpents',
        imageUrl: 'http://rpg.simplecommunion.com/tfm/mos.jpg',
        hoursPlayed: 198,
        isActive: true,
        sCreate: new Date('2019-12-18'),
        sUpdate: new Date('2021-04-19'),
      },
    ];

    return of(fakeGames);
  }
}
