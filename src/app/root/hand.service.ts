import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Card, Hand} from '../core/data/game';
import {map, tap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HandService {

  constructor(private db: AngularFireDatabase) {
  }


  getHand$(idHand: string): Observable<Hand> {
    console.log('hand.service::getHand$', idHand);

    return this.db.list<Hand>(`/hands`, ref => ref.orderByKey().equalTo(idHand)).valueChanges().pipe(
      tap(hands => console.log('hand.service::getHand$', hands)),
      map(hands => hands[0] ?? null),
      map(hand => {
        if (!hand) {
          return {} as Hand;
        }

        hand.cards = (hand.cards && hand.cards.length > 0) ? hand.cards.sort((a, b) => (a.order ?? 0) > (b.order ?? 0) ? -1 : 1)
          : [] as Card[];
        return hand;
      }),
      tap(hand => console.log('hand.service::getHand$ ', idHand, hand))
    );
  }
}
