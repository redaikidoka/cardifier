import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';

export interface LightBoxData {
  imageUrl: string;
  imageText: string;
  minX: number;
  minY: number;
}

@Component({
  selector: 'app-modal-lightbox',
  templateUrl: './modal-lightbox.component.html',
  styleUrls: ['./modal-lightbox.component.scss']
})
export class ModalLightboxComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalLightboxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LightBoxData) {
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
}
