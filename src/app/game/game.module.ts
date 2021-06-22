import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

import {CoreModule} from '../core/core.module';

import {PlayComponent} from './play/play.component';
import {AreaTitleComponent} from './area-title/area-title.component';
import {HandBlocksComponent} from './hand-blocks/hand-blocks.component';

@NgModule({
  declarations: [
    PlayComponent,
    AreaTitleComponent,
    HandBlocksComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule, CoreModule,
    MatTooltipModule, MatDialogModule
  ]
})
export class GameModule {
}
