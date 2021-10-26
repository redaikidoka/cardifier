import {Component, Input, OnInit} from '@angular/core';
import {Card, Hand} from '../../core/data/game';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import {ModalLightboxComponent} from '../../core/modal-lightbox/modal-lightbox.component';
import {ModalAddCardComponent} from '../modal-add-card/modal-add-card.component';
import {DiceService} from '../../root/dice.service';
import {ChatService} from '../../root/chat.service';
import {Chat} from '../../core/data/chat';
import {AuthService} from '../../root/auth.service';
import {LoggerService} from '../../root/logger.service';
import {HandService} from '../../root/hand.service';

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

  @Input() iconSize = 'h-8';
  @Input() titleSize = ' inline-block text-xl';
  @Input() cardStyle = 'inline-block bg-gray-200';
  @Input() cardTextStyle = '';
  @Input() bgStyle = '';
  @Input() bgImage = '';
  @Input() isOpen = true;
  @Input() showTitle = true;

  constructor(private picDialog: MatDialog, private roller: DiceService, private chatService: ChatService,
              private auth: AuthService, private logger: LoggerService, private handService: HandService) {
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
    this.roller.rollCardDice(card, this.hand?.idGame || '');
  }

  takeAction(card: Card): void {
    const actionText = `Uses ${this.hand?.handTitle}: ${card.cardTitle}:  `;

    const newChat = {
      idGame: this.hand?.idGame,
      idUser: this.auth.myId(),
      userName: this.auth.me().userName,
      message: actionText,
      when: (new Date()).valueOf(),
      systemText: card.description
    } as Chat;

    this.chatService.createChat(newChat);

    // add a new current card matching this thingy - probably via EventEmitter
    // this is an error
    // ask the hand service to delete this card from this hand
    this.handService.deleteCardFromHand(this.hand ?? {} as Hand, card).then(
      (returnValue) => {// and then actually delete it locally
        this.getHand().cards = this.getHand().cards.filter(c => c.idCard !== card.idCard);
      }
    );


  }

  addCard(): void {
    const dialogRef = this.picDialog.open(ModalAddCardComponent, {
      width: '75%',
      data: {},
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log('Hand-blocks.component addCard()', result);
    });
  }

  private getHand(): Hand {
    return this.hand ?? {cards: [] as Card[]} as Hand;
  }
}
