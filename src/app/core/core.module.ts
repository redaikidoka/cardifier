import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog';


import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserCardComponent} from './user-card/user-card.component';
import {ModalLightboxComponent} from './modal-lightbox/modal-lightbox.component';



@NgModule({
  declarations: [FooterComponent, NavbarComponent, UserCardComponent, ModalLightboxComponent],
  imports: [CommonModule, RouterModule, MatDialogModule
  ],
  exports: [FooterComponent, NavbarComponent, UserCardComponent, ModalLightboxComponent]
})
export class CoreModule {
}
