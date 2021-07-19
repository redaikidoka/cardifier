import {Pipe, PipeTransform} from '@angular/core';
import {Hand} from '../data/game';

@Pipe({
  name: 'handType'
})
export class HandTypePipe implements PipeTransform {

  transform(value: Hand[], type: string): Hand[] {
    return value ? value.filter(h => h.handType === type) : value;
  }

}
