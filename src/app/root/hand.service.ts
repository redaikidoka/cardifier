import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Card, Game, GameArea, Hand} from '../core/data/game';
import {map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class HandService {

  constructor(private afs: AngularFirestore, private logger: LoggerService) {
  }

  createGameHand$(hand: Hand): Promise<any> {

    return this.afs.collection('games').doc(hand.idGame).collection('hands').doc(hand.idHand).set(hand)
      .then((docRef) => console.log('hand.service::createGameHand$', docRef))
      .catch(err => this.logger.logErrObject('hand.service::createGameHand$', err, 'Could not make hand ' + hand.idHand));

  }

  deleteCardFromHand(hand: Hand, card: Card): Promise<any> {
    return this.afs.collection('games').doc(hand.idGame).collection('hands').doc(hand.idHand)
      .collection('cards').doc(card.idCard).delete()
      .then((returnValue) => {
        console.log('hand.service::deleteCardFromHand DONE! ', card);
      })
      .catch(err => {
        this.logger.logErr('hand.service:deleteCardFromHand',
          'Could not delete card ' + card.idCard, 'Card couldn\'t be deleted');
      });
  }

  addGameAreaHand(game: Game, area: GameArea, hand: Hand): Promise<any> {

    return this.afs.collection('games').doc(game.idGame).collection('areas').doc(area.idArea)
      .collection('hands').add(hand)
      .then((returnValue) => {
        console.log('hand.service::addGameAreaHand I received', returnValue);
      })
      .catch(err => {
        this.logger.logErr('hand.service:addGameAreaHand',
          'Could not add hand ' + hand.idHand, 'Hand couldn\'t be added');
        console.log('hand.service::addGameAreaHand', game, area, hand);
      })
    ;


  }

  addAreaCard(hand: Hand, cardToAdd: Card): any {

    // TODO: it matters where your hand is, becuase it's probably not simple, so we may need different versions of this!
    return null;
  }
  // getHand$(idHand: string): Observable<Hand> {
  //   console.log('hand.service::getHand$', idHand);
  //
  //   return this.db.list<Hand>(`/hands`, ref => ref.orderByKey().equalTo(idHand)).valueChanges().pipe(
  //     tap(hands => console.log('hand.service::getHand$', hands)),
  //     map(hands => hands[0] ?? null),
  //     map(hand => {
  //       if (!hand) {
  //         return {} as Hand;
  //       }
  //
  //       hand.cards = (hand.cards && hand.cards.length > 0) ? hand.cards.sort((a, b) => (a.order ?? 0) > (b.order ?? 0) ? -1 : 1)
  //         : [] as Card[];
  //       return hand;
  //     }),
  //     tap(hand => console.log('hand.service::getHand$ ', idHand, hand))
  //   );
  // }
}
