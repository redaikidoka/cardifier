import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/core/data/game';
import {AuthService} from '../../root/auth.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  static defaultBg = 'https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

  @Input() theGame: Game | null = null;

  idUser: string;
  isOwner = false;

  constructor(private auth: AuthService) {
    this.idUser = this.auth.myId();
  }

  ngOnInit(): void {
    this.isOwner = (this.theGame?.idUser === this.idUser);
  }

  getUrl(): string {
    return (`url('${this.theGame?.imageUrl || GameCardComponent.defaultBg}')`);
  }
}
