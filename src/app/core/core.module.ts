import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserCardComponent } from './user-card/user-card.component';


@NgModule({
  declarations: [FooterComponent, NavbarComponent, UserCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, NavbarComponent, UserCardComponent]
})
export class CoreModule {}
