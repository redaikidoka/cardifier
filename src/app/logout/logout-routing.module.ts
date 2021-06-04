import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ByeComponent } from './bye/bye.component';

const routes: Routes = [{ path: '', component: ByeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutRoutingModule {}
