import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CardUser } from 'src/app/core/data/card-user';
import { Game } from 'src/app/core/data/game';

import { AuthService } from 'src/app/root/auth.service';
import { GameService } from 'src/app/root/game.service';
import { UserService } from 'src/app/root/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  me$: Observable<CardUser>;
  games$: Observable<Game[]>;

  constructor(private auth: AuthService, private gameService: GameService) {
    this.me$ = this.auth.me$;

    this.games$ = this.gameService.getUserGames$(this.auth.myId());
  }

  ngOnInit(): void {}
}
