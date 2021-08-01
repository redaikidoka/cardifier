import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from 'src/app/core/data/game';

import { AuthService } from 'src/app/root/auth.service';
import { GameService } from 'src/app/root/game.service';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import {CardUser} from '../../core/data/card-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  // me$: Observable<CardUser>;
  games$: Observable<Game[]>;
  me: CardUser | undefined;
  constructor(private auth: AuthService, private gameService: GameService) {
    super();
    this.games$ = this.gameService.getCurrentUserGames$();

    this.subs.sink = this.auth.me$.subscribe(me =>
      {
        this.me = me;
        this.games$ = this.gameService.getCurrentUserGames$();
      }
    );

  }

  ngOnInit(): void {}
}
