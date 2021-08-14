import { Injectable } from '@angular/core';
import { Dice } from 'dice-typescript';
import {ChatService} from './chat.service';
import {Card} from '../core/data/game';
import {Chat} from '../core/data/chat';
import {AuthService} from './auth.service';
import {LoggerService} from './logger.service';

export interface RollResults {
  total: number;
  // dice: number[];
  verbose: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  private dieRoller: Dice;

  constructor(private auth: AuthService, private chatService: ChatService, private logger: LoggerService) {
    this.dieRoller = new Dice();
  }


  roll(rollMe: string): RollResults {
    console.log('dice.service::roll', rollMe, this.dieRoller.roll(rollMe));

    const rolled = this.dieRoller.roll(rollMe);
    return {total: rolled.total, verbose: rolled.renderedExpression} as RollResults;
    // return this.dieRoller.roll(rollMe).total;
  }

  rollCardDice(card: Card, cardIdGame: string, explicitFor: string = '', makeChat: boolean = true): RollResults {
    console.log('DiceService::rollCardDice - bout to roll ', card.dieRoll, ' for ', card.cardTitle);

    let rolling = card.dieRoll || '';
    if (explicitFor === '') {
      explicitFor = card.cardTitle;
    }

    if (rolling.indexOf('#CurrentValue') > 0) {
      console.log('dice.service::rollCardDice - replacing Current Value', rolling);
      rolling = rolling.replace('#CurrentValue', card.currentValue?.toString() || '') ;
    }

    const rolled = this.roll(rolling );
    console.log('hand-blocks.rollDice', rolling, rolled);

    if (makeChat) {
      const chat = {
        idGame: cardIdGame,
        idUser: this.auth.myId(),
        userName: this.auth.me().userName,
        message: `For _${explicitFor}_, I rolled ${rolled.total}`,
        when: (new Date()).valueOf(),
        systemText: `${card.dieRoll}  =  ${rolled.verbose}`
      } as Chat;

      this.chatService.createChat(chat).then((result: any) =>
        console.log('hand-blocks.rollDice', result, chat))
        .catch((err: Error) => this.logger.logErrObject('dice.service::rollCardDice', err, 'Could not make dice roll message'));
    }

    return rolled;
  }
}
