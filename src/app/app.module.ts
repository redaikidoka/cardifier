import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {RollbarErrorHandlerService, RollbarService, rollbarFactory} from './root/rollbar-error-handler.service';
import { LandingModule } from './landing/landing.module';

import {environment} from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule, LandingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FontAwesomeModule
  ],
  exports: [

  ],
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandlerService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
