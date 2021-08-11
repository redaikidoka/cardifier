import { Pipe, PipeTransform } from '@angular/core';
import {Hand} from './data/game';

@Pipe({
  name: 'handTypes'
})
export class HandTypesPipe implements PipeTransform {

  transform(value: Hand[], ...args: string[]): unknown {
    return value ? value.filter(h => args.indexOf(h.handType) > -1 ) : value;
  }

}
