import {Component, Input, OnInit} from '@angular/core';
import {Card, Hand} from '../../core/data/game';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import {ModalLightboxComponent} from '../../core/modal-lightbox/modal-lightbox.component';
import {DiceService} from '../../root/dice.service';
import {ChatService} from '../../root/chat.service';
import {Chat} from '../../core/data/chat';
import {AuthService} from '../../root/auth.service';
import {LoggerService} from '../../root/logger.service';

export interface DialogData {
  imageUrl: string;
  minX: number;
  minY: number;
}

@Component({
  selector: 'app-hand-blocks',
  templateUrl: './hand-blocks.component.html',
  styleUrls: ['./hand-blocks.component.scss']
})
export class HandBlocksComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @Input() hand: Hand | undefined;

  @Input() iconUrl: string | undefined;

  @Input() iconSize = 'h-6';
  @Input() titleSize = ' inline-block text-xl';
  @Input() cardStyle = 'inline-block bg-gray-200';
  @Input() cardTextStyle = '';
  @Input() bgStyle = '';
  @Input() bgImage = '';

  constructor(private picDialog: MatDialog, private roller: DiceService, private chatService: ChatService,
              private auth: AuthService, private logger: LoggerService) {
    super();
  }

  ngOnInit(): void {
  }

  showHandImage(hand: Hand | undefined): void {
    if (!hand) {
      return;
    }

    this.showImage(hand.imageUrl ?? '', hand.handTitle ?? '');
  }

  showFaceImage(card: Card): void {
    // this.picDialog.open(data: {imageUrl: url; minX: x ?? 300; minY: y?? 300})
    this.showImage(card?.faceImage ?? '', card.cardTitle);

  }

  showImage(url: string, title: string = ''): void {
    const dialogRef = this.picDialog.open(ModalLightboxComponent, {
      width: '75%',
      data: {imageUrl: url, imageText: title},
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log('Hand-blocks.component showImage()', result);
    });
  }

  cardTagIs(card: Card, key: string): boolean {
    if (card.tags && card.tags.length > 0) {
      return (card.tags.search(key) > -1);
    }

    return false;
  }

  getCardTextStyle(card: Card): string {
    return this.cardTextStyle +
      (this.cardTagIs(card, 'NPC') ? ' text-red-300 ' : '');
  }

  rollDice(card: Card): void {
    console.log('I am gonna roll ', card.dieRoll, ' for ', card.cardTitle);
    const rolled = this.roller.roll(card.dieRoll ?? '');
    console.log('hand-blocks.rollDice', rolled);

    const chat = {
      idGame: this.hand?.idGame,
      idUser: this.auth.myId(),
      userName: this.auth.me().userName,
      message: `For ${card.cardTitle}, I rolled ${rolled.total}`,
      when: (new Date()).valueOf(),
      systemText: card.dieRoll + ':' + rolled.verbose
    } as Chat;

    this.chatService.createChat(chat).then(result =>
      console.log('hand-blocks.rollDice', result, chat))
      .catch(err => this.logger.logErrObject('hand-blocks.rollDice', err, 'Could not make dice roll message'));
  }
}
