import {Component, Input, OnInit} from '@angular/core';
import {Card, Hand} from '../../core/data/game';
import {DiceService} from '../../root/dice.service';

@Component({
  selector: 'app-hand-dropdown',
  templateUrl: './hand-dropdown.component.html',
  styleUrls: ['./hand-dropdown.component.scss']
})
export class HandDropdownComponent implements OnInit {
  @Input() hand: Hand | undefined;

  currentId = '';
  currentCard: Card | undefined = {} as Card;

  @Input() iconUrl: string | undefined;

  @Input() iconSize = 'h-5';
  @Input() titleSize = ' inline-block text-xl';
  @Input() cardStyle = 'inline-block bg-gray-200 text-white';
  @Input() cardTextStyle = '';
  @Input() bgStyle = '';
  // @Input() bgImage = '';
  @Input() includeEmpty = false;

  @Input() showTitle = true;

  constructor(private roller: DiceService) { }

  ngOnInit(): void {
    // if we have no cards, bail out
    if (!this.hand || !this.hand.cards) { return; }

    // check for a current card
    if (this.hand.cards.some(card => card.tags && card.tags.indexOf('current') > -1)) {
      this.currentCard = this.hand.cards.find(c => c.tags?.indexOf('current') );
      console.log('currentCard:', this.currentCard);
      return;
    }

    // check for a default card
    if (this.hand.cards.some(card => card.tags && card.tags.indexOf('default') > -1)) {
      this.currentCard = this.hand.cards.find(c => c.tags?.indexOf('default') );
      console.log('default Card:', this.currentCard);
      return;
    }
  }

  getLabelStyle(): string {
    return this.titleSize + this.cardTextStyle;
  }

  newValue(): void {
    if (this.currentCard) {
      if (this.currentCard.dieRoll) {
        this.roller.rollCardDice(this.currentCard, this.hand?.idGame || '', this.hand?.handTitle + ': ' + this.currentCard.cardTitle);
      }
    }
  }
}
