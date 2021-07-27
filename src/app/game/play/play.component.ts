import {Component, OnInit} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {Game, GameSession, Hand} from '../../core/data/game';

import {GameService} from '../../root/game.service';
import {LoggerService} from '../../root/logger.service';
import {ChatService} from '../../root/chat.service';
import {Chat} from '../../core/data/chat';
import {HandService} from '../../root/hand.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent extends UnsubscribeOnDestroyAdapter {

  idGame = '8323';
  // theGame: Game | undefined;

  game$: Observable<Game> | undefined;
  chats$: Observable<Chat[]> | undefined;
  hand$: Observable<Hand> ;

  constructor(private aRoute: ActivatedRoute, private gameService: GameService, private logger: LoggerService,
              private chatService: ChatService, private handService: HandService) {
    super();

    this.hand$ = this.handService.getHand$('44');


    // get our id
    this.subs.sink = this.aRoute.params.subscribe(params => {
      // console.log('Play::params', params);
      if (params?.id) {
        this.idGame = params.id;

        this.game$ = this.gameService.getGame$(this.idGame);

        this.chats$ = this.chatService.getGameChat$(this.idGame);
      } else {
        // this.snackBar.open('ERROR: NO ID!');
        this.logger.logErr('Game::Play() - no id', 'No Game ID passed in', 'Could not start GamePlay screen');
      }
    });

  }

  createGameHand(game: Game): void {

  }

  // stupid
  createSessionHand(session: GameSession | undefined): void {
    if (!session) {
      return;
    }

    console.log('make session', session);
  }
}
