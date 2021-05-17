import {ErrorHandler, Injectable, InjectionToken, Injector} from '@angular/core';
import Rollbar from 'rollbar';
import {environment} from '../../environments/environment';
// import {MatSnackBar} from '@angular/material/snack-bar';
export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable({
  providedIn: 'root'
})
export class RollbarErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector /*, private snackBar: MatSnackBar*/) {
  }

  handleError(err: any): void {
  console.log('RollbarErrorHandlerService:: err received');
    console.log(err);
    if (environment.production) {
      const rollbar = this.injector.get(RollbarService);
      rollbar.error(err.originalError || err);
    } else {
      console.error('Global Error handler', err);
    }

    // try {
    //   this.snackBar.open('Error: ' +  err, null,
    //     {duration: 3000, verticalPosition: 'bottom', horizontalPosition:  'right'} );
    // } catch (e) {
    //   console.error('Global Error handler - couldn\'t snackbar', e);
    // }

  }
}

export function rollbarFactory() {
  return new Rollbar(environment.rollbarConfig);
}
