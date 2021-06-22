import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
export class ModalLightboxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalLightboxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LightBoxData) { }

  ngOnInit(): void {
  }

  closeUp(): void {
    this.dialogRef.close();
  }
}
