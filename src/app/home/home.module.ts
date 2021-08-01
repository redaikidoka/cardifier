import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';
import { GameCardComponent } from './game-card/game-card.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    HomeComponent,
    GameCardComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CoreModule,
        MatTooltipModule
    ]
})
export class HomeModule { }
