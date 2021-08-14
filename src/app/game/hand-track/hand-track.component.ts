import {Component, Input, OnInit} from '@angular/core';
import {Card, Hand} from '../../core/data/game';
import {DiceService} from '../../root/dice.service';

@Component({
  selector: 'app-hand-track',
  templateUrl: './hand-track.component.html',
  styleUrls: ['./hand-track.component.scss']
})
export class HandTrackComponent implements OnInit {
  @Input() hand: Hand = {} as Hand;

  currentCard: Card | undefined;

  @Input() bgStyle = '';
  @Input() showExpanded = true;
  @Input() showTitle = true;

  constructor(private roller: DiceService) {
  }

  ngOnInit(): void {
    // if we have no cards, bail out
    if (!this.hand || !this.hand.cards) { return; }

    // handstate should inform showExpanded
    this.showExpanded = (this.hand.handState === 'Open' ) ;

    // check for a current card\
    if (this.hand.currentIdCard) {
      const current = this.hand.cards.find(c => c.idCard === this.hand?.currentIdCard );
      if (current) {
        this.selectCard(current);
        console.log('- currentCard:', this.currentCard);
      } else {
        console.error(' - could not find current card', this.hand.currentIdCard);
        this.hand.currentIdCard = '';
      }

    } else {
      // default card?
      if (this.hand.cards.some(card => card.tags && card.tags.indexOf('default') > -1)) {
        const defaultCard = this.hand.cards.find(c => c.tags?.indexOf('default') );
        this.selectCard(defaultCard ?? {} as Card);
        console.log('default Card:', this.currentCard);
        return;
      } else {
        console.log('no default card either');
      }
    }

  }

  selectCard(card: Card): void {
    if (!card || card.idCard === '' || (card.idCard === this.currentCard?.idCard)) {
      this.currentCard = undefined;
      // @ts-ignore
      this.hand.currentIdCard = '';
      return;
    }


    this.currentCard = card;
    // @ts-ignore
    this.hand.currentIdCard = card.idCard;

    if (card.dieRoll) {
      this.roller.rollCardDice(card, this.hand?.idGame || '');
    }
  }

  currentBg(): string {
    let bg = this.bgStyle;

    if (this.currentCard) {
      bg += this.currentCard.faceColor;
    }

    return bg;
  }

  cardStyle(card: Card): string {
    let theStyle = card.faceColor || '';

    if (card.idCard === this.currentCard?.idCard) {
      theStyle += ' border-4 border-white text-white ';
    } else {
      theStyle += ' border-1 border-gray-500 ';
    }

    if (this.hand.handState === 'Closed') {
      if (card.idCard !== this.currentCard?.idCard) {
        theStyle = ' hidden ';
      }
    }

    return theStyle;
  }

  flipExpanded(): void {
    this.hand.handState = (this.showExpanded ? 'Condensed' : 'Open');
    // update

    this.showExpanded = !this.showExpanded;
  }

  fullExpandContract(): void {
    if (this.hand.handState !== 'Closed') {
      this.hand.handState = 'Closed';
      this.showExpanded = false;
    } else {
      this.hand.handState = 'Open';
      this.showExpanded = true;
    }

  }
}
