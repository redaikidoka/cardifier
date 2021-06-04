import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayComponent} from './play/play.component';

const routes: Routes = [
  {path: '', component: PlayComponent},
  {path: 'play', component: PlayComponent},
  {path: 'edit', component: PlayComponent},
  {path: 'run', component: PlayComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
