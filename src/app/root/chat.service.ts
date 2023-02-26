import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Chat, GameChats} from '../core/data/chat';
import {map, tap} from 'rxjs/operators';
import firebase from 'firebase/compat';
import ThenableReference = firebase.database.ThenableReference;
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore) {

  }

  getGameChat$(idGame: string, count: number = 20): Observable<Chat[]> {

    console.log('chat.service:getGameChat$', idGame, count);

    return this.afs.collection<Chat>(`games/${idGame}/chats`, ref => ref.orderBy('when').limitToLast(10)).valueChanges().pipe(
      tap(chats => console.log('chat.service::getGameChat$: ', chats))
    );
    // return this.db.list<Chat>(`/chatGames/${idGame}`, ref => ref.orderByChild('when').limitToLast(count)).valueChanges().pipe(
    //   // tap(gg => console.log('Game.Service::getUserGames$', gg)),
    //   // map(chats => games.sort((a, b) => (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1)),
    //   tap(chatObject => console.log('chat.service::getGameChat$: ', chatObject))
    //   // map(chatObject => chatObject[0]?.chats ? chatObject[0].chats : [] as Chat[]),
    //   // tap( chats => console.log('chat.service::getGameChat$: the chats', chats))
    // );
  }

  // getGameChat$Old(idGame: string, count: number = 20): Observable<Chat[]> {
  //
  //   return this.db.list<GameChats>('/gameChats', ref => ref.orderByKey().equalTo(idGame).limitToLast(count)).valueChanges().pipe(
  //     // tap(gg => console.log('Game.Service::getUserGames$', gg)),
  //     // map(chats => games.sort((a, b) => (a.lastPlayed ?? 0) > (b.lastPlayed ?? 0) ? -1 : 1)),
  //     tap(chatObject => console.log('chat.service::getGameChat$: ', chatObject)),
  //     map(chatObject => chatObject[0]?.chats ? chatObject[0].chats : [] as Chat[]),
  //     tap( chats => console.log('chat.service::getGameChat$: the chats', chats))
  //   );
  // }

  createChat(chat: Chat): any {
    return this.afs.collection('games').doc(chat.idGame).collection('chats').add(chat);

  }
  // createChat(chat: Chat): ThenableReference {
  //   const itemRef = this.db.list(`/chatGames/${chat.idGame}`);
  //
  //   return itemRef.push(chat);
  // }

 // createChatOld(chat: Chat): ThenableReference {
 //    const itemRef = this.db.list('/gameChats/' + chat.idGame + '/chats');
 //
 //    return itemRef.push(chat);
 //  }

}
