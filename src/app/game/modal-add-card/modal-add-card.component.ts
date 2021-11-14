import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import { Hand, Card } from '../../core/data/game';

export interface AddCardData {
  hand: Hand;
  minX: number;
  minY: number;
  card: Card;
}

@Component({
  selector: 'app-modal-add-card',
  templateUrl: './modal-add-card.component.html',
  styleUrls: ['./modal-add-card.component.scss']
})
export class ModalAddCardComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalAddCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddCardData) {
    super();
  }

  ngOnInit(): void {
    this.subs.sink = this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.onCancel();
      }
    });

    this.subs.sink = this.dialogRef.backdropClick().subscribe(event => {
      this.onCancel();
    });
  }

  onCancel(): void {
    this.dialogRef.close(this.data);
  }

  closeUp(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    window.alert('Save, bitch!');
  }

}
