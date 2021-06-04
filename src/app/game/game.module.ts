import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayComponent } from './play/play.component';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [
    PlayComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule, CoreModule
  ]
})
export class GameModule { }
