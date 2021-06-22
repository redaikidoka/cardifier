import {Component, Input, OnInit} from '@angular/core';
import {Hand} from '../../core/data/game';
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

  @Input() iconSize = 'h-6';
  @Input() titleSize = 'text-xl';
  @Input() textSize = '';
  @Input() bgStyle = '';
  @Input() bgImage = '';

  constructor(private picDialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  showImage(url: string, displayText: string, x: number = 300, y: number = 300): void {
    // this.picDialog.open(data: {imageUrl: url; minX: x ?? 300; minY: y?? 300})
    const dialogRef = this.picDialog.open(ModalLightboxComponent, {
      width: '75%',
      data: {imageUrl: url, imageText: displayText},
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log('Hand-blocks.component showImage()', result);

    });
  }
}
