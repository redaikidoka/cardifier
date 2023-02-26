import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AngularFireModule } from '@angular/fire/compat';
// import {AngularFireModule } from "@angular/fire";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import {
  RollbarErrorHandlerService,
  RollbarService,
  rollbarFactory,
} from './root/rollbar-error-handler.service';
import { LandingModule } from './landing/landing.module';

import { environment } from '../environments/environment';
import { LoginModule } from './login/login.module';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PageNotFoundComponent } from './root/page-not-found/page-not-found.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, RouterModule,
    AppRoutingModule,
    CoreModule,
    LandingModule,
    LoginModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => {
    //   const firestore = getFirestore();
    //   connectFirestoreEmulator(firestore, 'localhost', 8080);
    //   enableIndexedDbPersistence(firestore);
    //   return firestore;
    // }),
    MatSnackBarModule,
    AngularFireModule, AngularFirestoreModule
  ],
  exports: [],
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandlerService },
    { provide: RollbarService, useFactory: rollbarFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
