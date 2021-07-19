import {Component, Input, OnInit} from '@angular/core';
import {Card, Hand} from '../../core/data/game';

@Component({
  selector: 'app-hand-dropdown',
  templateUrl: './hand-dropdown.component.html',
  styleUrls: ['./hand-dropdown.component.scss']
})
export class HandDropdownComponent implements OnInit {
  @Input() hand: Hand | undefined;

  currentId = '';
  currentCard: Card = {} as Card;

  @Input() iconUrl: string | undefined;

  @Input() iconSize = 'h-5';
  @Input() titleSize = ' inline-block text-xl';
  @Input() cardStyle = 'inline-block bg-gray-200 text-white';
  @Input() cardTextStyle = '';
  @Input() bgStyle = '';
  @Input() bgImage = '';

  constructor() { }

  ngOnInit(): void {
  }

  getLabelStyle(): string {
    return this.titleSize + this.cardTextStyle;
  }
}
