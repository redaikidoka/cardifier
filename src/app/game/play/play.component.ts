import { Component, OnInit } from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {Game} from '../../core/data/game';

import {GameService} from '../../root/game.service';
import {LoggerService} from '../../root/logger.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  idGame = 1;
  theGame: Game | undefined;

  game$: Observable<Game> | undefined;

  constructor(private aRoute: ActivatedRoute, private gameService: GameService, private logger: LoggerService) {
    super();

    // get our id
    this.subs.sink = this.aRoute.queryParams.subscribe(params => {
      if (params?.id) {
        this.idGame = params.id;

        console.log('PlayComponent()::id', this.idGame);

        this.game$ = this.gameService.getGame$(this.idGame);
        // this.gameService.getGame$(idGame).subscribe( g=> {
      } else {
        // this.snackBar.open('ERROR: NO ID!');
        this.logger.logErr('Game::Play() - no id', 'No Game ID passed in', 'Could not start GamePlay screen');
      }
    });


  }

  ngOnInit(): void {
  }

}
