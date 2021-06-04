import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import { ByeComponent } from './bye/bye.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ByeComponent],
  imports: [CommonModule, LogoutRoutingModule, CoreModule],
})
export class LogoutModule {}
