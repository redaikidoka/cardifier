import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

import {CoreModule} from '../core/core.module';

import {PlayComponent} from './play/play.component';
import {AreaTitleComponent} from './area-title/area-title.component';
import {HandBlocksComponent} from './hand-blocks/hand-blocks.component';
import { HandDropdownComponent } from './hand-dropdown/hand-dropdown.component';
import { MatSelectModule} from '@angular/material/select';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {MatTabsModule} from '@angular/material/tabs';
import {HandTrackComponent} from './hand-track/hand-track.component';

@NgModule({
  declarations: [
    PlayComponent,
    AreaTitleComponent,
    HandBlocksComponent,
    HandDropdownComponent,
    HandTrackComponent,
    ChatListComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule, CoreModule,
    MatTooltipModule, MatDialogModule, MatSelectModule, MatTabsModule
  ]
})
export class GameModule {
}
