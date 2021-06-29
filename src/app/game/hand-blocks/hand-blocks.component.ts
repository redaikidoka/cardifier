import {Component, Input, OnInit} from '@angular/core';
import {Card, Hand} from '../../core/data/game';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import {ModalLightboxComponent} from '../../core/modal-lightbox/modal-lightbox.component';

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

  @Input() iconSize = 'h-5';
  @Input() titleSize = ' inline-block text-xl';
  @Input() cardStyle = 'inline-block bg-gray-200';
  @Input() cardTextStyle = '';
  @Input() bgStyle = '';
  @Input() bgImage = '';

  constructor(private picDialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  showHandImage(hand: Hand | undefined): void {
    if (!hand) { return; }

    this.showImage( hand.imageUrl ?? '', hand.handTitle ?? '');
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
      ( this.cardTagIs(card, 'NPC') ? ' text-red-300 ' : '' );
  }
}
