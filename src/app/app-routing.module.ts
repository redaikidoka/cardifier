import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LandingComponent} from './landing/landing/landing.component';
import {LoginComponent} from './login/login/login.component';

import {PageNotFoundComponent} from './root/page-not-found/page-not-found.component';

import {AuthGuard} from './root/auth.guard';
import {canActivate} from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./logout/logout.module').then((m) => m.LogoutModule),
  },
  {path: 'play/:id', loadChildren: () => import('./game/game.module').then((m) => m.GameModule), canActivate: [AuthGuard]},

  // Wild Card Route for 404 request
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
