import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Chat, GameChats} from '../core/data/chat';
import {Game} from '../core/data/game';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) {

  }

  getGameChat$(idGame: string, count: number = 20): Observable<Chat[]> {


    return this.db.list<GameChats>('/gameChats', ref => ref.orderByKey().equalTo(idGame).limitToLast(count)).valueChanges().pipe(
      // tap(gg => console.log('Game.Service::getUserGames$', gg)),
      // map(chats => games.sort((a, b) => (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1)),
      tap(chatObject => console.log('chat.service::getGameChat$: ', chatObject)),
      map(chatObject => chatObject[0]?.chats ? chatObject[0].chats : [] as Chat[]),
      tap( chats => console.log('chat.service::getGameChat$: the chats', chats))
    );
  }

}
