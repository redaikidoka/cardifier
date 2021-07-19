import { Injectable } from '@angular/core';
import { Dice } from 'dice-typescript';

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

  constructor() {
    this.dieRoller = new Dice();
  }


  roll(rollMe: string): RollResults {
    console.log('dice.service::roll', rollMe, this.dieRoller.roll(rollMe));

    const rolled = this.dieRoller.roll(rollMe);
    return {total: rolled.total, verbose: rolled.renderedExpression} as RollResults;
    // return this.dieRoller.roll(rollMe).total;
  }
  // rollDice(rollMe: string): RollResults {
  //   const results = {} as RollResults;
  //   let count = 0;
  //   let dieType = 0;
  //
  //   results.sum = 0;
  //
  //
  //   count = this.parseCount(rollMe);
  //   dieType = this.parseDieType(rollMe);
  //
  //   for (let d = 0; d < count; d++ ) {
  //     const roll = this.randomIntFromInterval(1, dieType);
  //
  //   }
  //
  //   return results;
  // }

  // private parseCount(rollMe: string): number {
  //
  // }
  //
  // private parseDieType(rollMe: string): number {
  //
  // }


}
