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
}
