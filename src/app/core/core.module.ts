import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog';


import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserCardComponent} from './user-card/user-card.component';
import {ModalLightboxComponent} from './modal-lightbox/modal-lightbox.component';
import { HandTypePipe } from './pipe/hand-type.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HandTypesPipe } from './hand-types.pipe';



@NgModule({
  declarations: [FooterComponent, NavbarComponent, UserCardComponent, ModalLightboxComponent, HandTypePipe, HandTypesPipe],
  imports: [CommonModule, RouterModule, MatDialogModule, MatTooltipModule
  ],
  exports: [FooterComponent, NavbarComponent, UserCardComponent, ModalLightboxComponent, HandTypePipe]
})
export class CoreModule {
}
