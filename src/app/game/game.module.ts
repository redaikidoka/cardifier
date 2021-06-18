import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayComponent } from './play/play.component';
import {CoreModule} from '../core/core.module';
import { AreaTitleComponent } from './area-title/area-title.component';


@NgModule({
  declarations: [
    PlayComponent,
    AreaTitleComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule, CoreModule
  ]
})
export class GameModule { }
