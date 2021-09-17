import {Injectable} from '@angular/core';
import {Dice} from 'dice-typescript';
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

export type dieRollType = 'Basic' | 'Cypher' | '';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  private dieRoller: Dice;


  static getDieType(rollMe: string): dieRollType {
    let dieType: dieRollType = 'Basic';


    if (rollMe.indexOf('dC') >= 0) {
      dieType = 'Cypher';
    }

    return dieType;
  }


  constructor(private auth: AuthService, private chatService: ChatService, private logger: LoggerService) {
    this.dieRoller = new Dice();
  }


  roll(rollMe: string, value: number = 0): RollResults {
    let rolling = rollMe || '';

    const dieType = DiceService.getDieType(rollMe);

    rolling = this.parseRoll(rolling, dieType, value);

    const rolled = this.dieRoller.roll(rollMe);
    console.log('dice.service::roll', rollMe, rolled);

    return {total: rolled.total, verbose: rolled.renderedExpression} as RollResults;
    // return this.dieRoller.roll(rollMe).total;
  }

  rollAndChat(rollMe: string, gameId: string, explicitFor: string = '' ): RollResults {
    const dieType: dieRollType = DiceService.getDieType(rollMe);

    const rolling = this.parseRoll(rollMe, dieType, 0);

    const rolled = this.roll(rolling);
    console.log('DiceService.rollCardDice', rolling, rolled);

    const chat = {
      idGame: gameId,
      idUser: this.auth.myId(),
      userName: this.auth.me().userName,
      message: `${explicitFor ? ('For _' + explicitFor + '_, ') : ''} I rolled ${rolled.total}`,
      when: (new Date()).valueOf(),
      systemText: `${this.systemText(rolling, rolled, dieType)}`
    } as Chat;

    this.chatService.createChat(chat).then((result: any) =>
      console.log('diceService.rollAndChat', result, chat))
      .catch((err: Error) => this.logger.logErrObject('dice.service::rollAndChat', err, 'Could not make dice roll message'));

    return rolled;
  }

  parseRoll(rollMe: string, dieType: dieRollType, value: number): string {
    let newRoll = rollMe;

    // current value
    if (newRoll.indexOf('#CurrentValue') >= 0) {
      console.log('dice.service::parseRoll - replacing Current Value', value);
      newRoll = newRoll.replace('#CurrentValue', value.toString() );
    }

    // special dice types

    // Cypher ... dC = d20
    if (dieType === 'Cypher') {
      newRoll = newRoll.replace('dC', 'd20');
    }

    return newRoll;
  }

  rollCardDice(card: Card, cardIdGame: string, explicitFor: string = '', makeChat: boolean = true): RollResults {
    console.log('DiceService::rollCardDice - bout to roll ', card.dieRoll, ' for ', card.cardTitle);

    let rolling = card.dieRoll || '';

    const dieType: dieRollType = DiceService.getDieType(rolling);

    if (explicitFor === '') {
      explicitFor = card.cardTitle;
    }

    rolling = this.parseRoll(rolling, dieType, card.currentValue || 0);

    const rolled = this.roll(rolling);
    console.log('DiceService.rollCardDice', rolling, rolled);

    if (makeChat) {
      const chat = {
        idGame: cardIdGame,
        idUser: this.auth.myId(),
        userName: this.auth.me().userName,
        message: `${explicitFor ? ('For _' + explicitFor + '_, ') : ''} I rolled ${rolled.total}`,
        when: (new Date()).valueOf(),
        systemText: `${this.systemText(card.dieRoll || '', rolled, dieType)}`
      } as Chat;

      this.chatService.createChat(chat).then((result: any) =>
        console.log('hand-blocks.rollDice', result, chat))
        .catch((err: Error) => this.logger.logErrObject('dice.service::rollCardDice', err, 'Could not make dice roll message'));
    }

    return rolled;
  }

  systemText(dieRoll: string, rolled: RollResults, dieType: dieRollType): string {
    switch (dieType) {

      case 'Cypher': {
        const success = Math.floor(rolled.total / 3);
        const special = this.cypherSpecialText(rolled.total);
        return `${dieRoll} = ${rolled.verbose}, a Level ${success} Success${special ? '\n' + special : ''}`;

      }

      case 'Basic' || '':
      default: {
        return `${dieRoll}  =  ${rolled.verbose}`;
      }
    }
  }

  cypherSpecialText(roll: number): string {
    let special = '';

    switch (roll) {
      case 1:
        special = 'Failure. Free GM Intrusion';
        break;
      case 17:
        special = 'Add 1 Damage';
        break;
      case 18:
        special = 'Add 2 Damage';
        break;

      case 19:
        special = 'Minor Effect: +3 damage and minor effect.';
        break;

      case 20:
        special = 'Major Effect: +4 damage and a major effect.';
        break;

    }

    if (special > '') {
      special = 'SPECIAL: ' + special;
    }
    return special;
  }

}
