import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/core/data/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() theGame: Game | null = null;
  constructor() {}

  ngOnInit(): void {}

  getBgImage(): string {
    return (
      this.theGame?.imageUrl ||
      'https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
    );
  }
}
