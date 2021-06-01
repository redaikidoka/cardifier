import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RollbarService } from './rollbar-error-handler.service';
import Rollbar from 'rollbar';

import { UnsubscribeOnDestroyAdapter } from './unsubscribe-on-destroy-adapter';

import { CardUser } from '../core/data/card-user';

import { environment } from '../../environments/environment';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root',
})
export class LoggerService extends UnsubscribeOnDestroyAdapter {
  me: CardUser | null = null;

  constructor(
    @Inject(RollbarService) private rollbar: Rollbar,
    private systemService: SystemService
  ) {
    super();
  }

  makeLog(area: string, logText: string): void {
    // const qLog = gql` mutation MyMutation {
    //     __typename
    //     createSLog(
    //       input: {
    //         sLog: {
    //           app: "webSTR"
    //           appVersion: "${environment.APP_VERSION}"
    //           area: "${area}"
    //           isComplete: true
    //           logText: "${logText}"
    //           sCreateUser: ${this.me()?.idAdmUser ?? null}
    //         }
    //       }
    //     )
    //     { clientMutationId }
    //   } `;
    // // //////////////////////////////
    // // rollbar
    // try {
    //   // this.setUserPayload(usr);
    //   // this.rollBar.info(area + '::' + logText);
    //   this.rollbar.info('v' + environment.APP_VERSION + ' [' + area + '] \t' + logText + '\n');
    // } catch (err) {
    //   console.error('LoggerService::makeLog - Could not make log to rollbar', err);
    // }
    // // log in application
    // this.subs.sink = this.apollo.mutate({mutation: qLog}).pipe(
    //   tap(result => console.log('LoggerService::MakeLog() Logged!', result),
    //     err => this.logErrObject('LoggerService::MakeLog()', err, 'Could not make log ' + logText)
    //   )
    // ).subscribe(res => console.log('makeLog result', res));
  }

  logErrObject(area: string, err: Error, userText: string): void {
    this.logErr(area, err ? err.message : userText, userText);
  }

  // PS 2019-12-06 12:09:13 : actually write the error!
  logErr(area: string, errText: string, userText: string): void {
    console.error('logErr:', area, ': ', errText, '\n', userText);

    const createUser = this.me?.idUser ?? '';

    // const qNewError = gql`mutation NewError {
    //   __typename
    //   createSErr(input: {sErr: {area: "${area}",
    //     errorText: "${errText}"
    //     ${ app } ${createUser}
    //      }}) {
    //     clientMutationId
    //   }
    // }`;

    // this.snackBar.open(userText, 'Error', {duration: 2500});
    // try {
    //   this.writeRollbarErrorText(area, errText, userText);
    // } catch (e) {
    //   console.error('LoggerService::LogErr could not log Rollbar Error', e);
    // }

    // this.subs.sink = this.apollo.mutate<any>({mutation: qNewError}).pipe(
    //   tap(res => console.warn('LoggerService::logErr ', res, qNewError),
    //     err => {
    //       window.alert('Logger::logErr could NOT log  database error: \n' + err);
    //       console.error('Logger::logErr could NOT log database error', err);
    //     })
    // ).subscribe(res => console.log('logErr result', res),
    // err => console.error('LoggerService::logErr error logging database error', err));
  }

  private writeRollbarErrorText(
    area: string,
    errText: string,
    userText: string
  ): void {
    const userInfo = this.me?.idUser
      ? '\nUSER ' + this.me?.idUser + ' ' + this.me?.userName
      : '\n:::NO USER INFO:::\n';

    if (!environment.production) {
      console.log(
        'writeRollbarErrorText::Error Not logged to rollbar in non-production environment'
      );
      return;
    }
    try {
      this.rollbar.error(
        area + '\nERR:\n' + errText + '\nMESSAGE:\n' + userText + userInfo
      );
    } catch (err) {
      console.error('Could not log error text to Rollbar', err);
    }
  }
}
