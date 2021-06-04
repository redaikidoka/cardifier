import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { UnsubscribeOnDestroyAdapter } from './unsubscribe-on-destroy-adapter';
import { Observable, BehaviorSubject, Subject, ReplaySubject, of } from 'rxjs';

import firebase from 'firebase';
import UserInfo = firebase.UserInfo;
import User = firebase.User;
import { AngularFireAuth } from '@angular/fire/auth';

// @ts-ignore
import * as cloneDeep from 'lodash/cloneDeep';

// import {MatSnackBar} from '@angular/material/snack-bar';

import { CardUser } from '../core/data/card-user';

import { environment } from '../../environments/environment';

import { UserService } from './user.service';
import { LoggerService } from './logger.service';
import { SystemService } from './system.service';

export interface AuthStateModel {
  user: Partial<UserInfo>;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends UnsubscribeOnDestroyAdapter {
  private currentUser$: BehaviorSubject<CardUser> =
    new BehaviorSubject<CardUser>({} as CardUser);

  private authInfo: AuthStateModel;
  private testToken = '2021-02-23test';

  private loggedIn = false;

  public me$: Observable<CardUser> = this.currentUser$.asObservable();

  getCurrentUser$(): Observable<CardUser> {
    return this.currentUser$.asObservable() as Observable<CardUser>;
  }

  getCurrentUser(): CardUser {
    if (this.currentUser$.getValue()) {
      return this.currentUser$.getValue();
    }
    const notReal = {} as CardUser;
    return notReal;
  }

  // me$(): Observable<CardUser> {
  //   return this.getCurrentUser$();
  // }

  me(): CardUser {
    return this.getCurrentUser();
  }

  myId(): number {
    return this.me()?.idUser;
  }

  constructor(
    public ngAuth: AngularFireAuth,
    private systemService: SystemService,
    private userService: UserService,
    private logger: LoggerService,
    private zone: NgZone,
    private router: Router
  ) {
    super();

    this.authInfo = {} as AuthStateModel;

    this.ngAuth.onAuthStateChanged((fUser) => {
      // console.log('AuthState::onAuthStateChanged', fUser);
      console.log('AuthState::onAuthStateChanged', fUser?.email);

      if (fUser) {
        fUser.getIdToken().then((token: string) => {
          // console.log('AuthState::AUTH TOKEN', token);
          // console.log('AuthState::CURRENT USER', fUser);
          const saveMe = { displayName: fUser.displayName, email: fUser.email };
          this.authInfo = { user: saveMe, token };
          this.subs.sink = this.loginUserEmail(
            fUser.email || '',
            token
          ).subscribe((user) => {
            if (user.idUser) {
              // we got a user! Login!
            } else {
              // nope. We out.
              this.authInfo = {} as AuthStateModel;
              // this.snackBar.open('Could not login', 'Failed');
            }
          });
        });
      } else {
        if (this.validTestLogin()) {
          console.warn('AuthState::onAuthStateChanged validTestLogin');
          const me = this.getCurrentUser();
          const saveMe = { displayName: me.userName, email: me.userEmail };
          const token: string = this.authInfo.token || '';
          this.authInfo = { user: saveMe, token };
        } else {
          this.logout();
        }
      }
    });

    if (this.checkSavedUser()) {
      console.log('AuthService():: Saved user found!');
    }
  }

  recordLogin(loginInfo: string, userId: number, user: any): void {
    return this.logger.makeLog('Login', loginInfo);
  }

  recordLogout(user: any): void {
    return this.logger.makeLog('Logout', 'User logged out');
  }

  logout(navigate: boolean = true): void {
    console.log('AuthService::logout()');
    // this.snackBar.open('Logging out...', '', { duration: 500 });

    this.recordLogout(this.getCurrentUser());

    if (this.loggedIn) {
      this.loggedIn = false;
      this.authInfo = {} as AuthStateModel;
      this.currentUser$.next({} as CardUser);

      localStorage.removeItem(environment.APP_NAME + '-Token');
      localStorage.removeItem(environment.APP_NAME + '-User');
      localStorage.removeItem(environment.APP_NAME + '-Server');

      console.log('AuthService::logout() clearned login info');
    }

    this.ngAuth
      .signOut()
      .then(() => {
        console.log('AuthService::logout() auth.signOut.then');

        if (navigate) {
          console.log('AuthService::logout - navigating home');
          this.navigateHome();
        }
      })
      .catch((error: any) => {
        this.logger.logErrObject(
          'AuthService::logout catch',
          error,
          'Could not logout'
        );
        // this.snackBar.open('Could not logout', '', { duration: 3000 });
        return;
      });
  }

  navigateHome(): void {
    console.log('AuthService::navigateHome');

    if (!this.loggedIn) {
      console.error(
        'AuthService::navigateHome Not Logged In, Navigating to login'
      );
      this.zone.run(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    this.zone.run(() => {
      this.router
        .navigate(['/home'])
        .then((e: any) => {
          console.log(
            'authService::navigateHome()::goForIt to /home  for ',
            this.getCurrentUser(),
            'info:',
            e
          );

          if (e === false) {
            this.logger.logErr(
              'Login',
              'Could not login to dashboard:',
              'Could not login'
            );
          }
        })
        .catch((reason: any) => {
          console.error(
            'authService::navigateHome() failed to nav reason:',
            reason
          );
          // this.showLoginErr( 'Could not navigate to your dashboard', 'The error is: ' + reason);

          this.logger.logErrObject(
            'Login::goForIt',
            reason,
            'Could not navigate to dashboard :('
          );
        });
    });
  }

  testLogin(idUser: number): Observable<CardUser> {
    console.log('AuthService::testLogin(', idUser);

    if (this.isLoggedIn()) {
      console.log('AuthService::testLogin - logging out ', this.me());
      this.logout(false);
    }

    return this.userService.getUser(idUser).pipe(
      map((found) => {
        console.log('AuthService::testLogin(): LOADED test USER', found);
        this.currentUser$.next(found);
        this.authInfo = {
          user: { displayName: found.userName, email: found.userEmail },
          token: this.testToken,
        };
        // this.authInfo.token = this.testToken;

        return found;
      }),
      concatMap(() => this.loginUser(this.me())),
      catchError((err) => {
        this.logger.logErrObject(
          'AuthService::testLogin',
          err,
          'Could not login user id ' + idUser
        );
        return of({} as CardUser);
      })
    );
  }

  loginUser(user: CardUser): Observable<CardUser> {
    console.log('AuthService::loginUser', user);

    if (!this.authInfo.token) {
      this.logger.logErr(
        'loginUser',
        'no login token',
        'Could not get Login Token'
      );
      return of({} as CardUser);
    }

    this.loggedIn = true;

    this.saveUser(user);

    this.recordLogin(
      user.userName +
        ' user login succeeded from ' +
        environment.DATA_URL +
        ' ' +
        environment.env_name,
      user.idUser,
      user
    );

    return this.getCurrentUser$();
  }

  loginUserEmail(email: string, token: string): Observable<CardUser> {
    console.log('AuthService::loginUserEmail ', email);

    if (this.isLoggedIn()) {
      console.log('Auth::loginEmail Logged in test user!');
      this.logout(false);
    }

    return this.userService.getUserByEmail(email).pipe(
      concatMap((found: CardUser) => {
        if (found) {
          console.log('AUthService::loginEmail working', found);
          this.authInfo = {
            user: { displayName: found.userName, email: found.userEmail },
            token: this.testToken,
          };
          return this.loginUser(found);
        } else {
          this.logger.logErr(
            'AuthService::loginEmail',
            'Could not login ' + email,
            'Could not login!'
          );
          this.logger.makeLog('LoginUserEMail', email + ' LOGIN FAILED');
          this.logout();
          return of({} as CardUser);
        }
      }),
      catchError((err) => {
        this.logger.logErrObject(
          'AuthService::loginEmail',
          err,
          'Could not login this email ' + email
        );

        this.logout();
        return of({} as CardUser);
      })
    );
  }

  checkSavedUser(): boolean {
    console.log('AuthService::checkSavedUser - faking up someone saved');

    // TODO: FIX
    const faker = {
      idUser: -1,
      userEmail: 'somebody@simplecommunion.com',
      userName: 'Pól Stafford',
      imageUrl: 'http://rpg.simplecommunion.com/pds/me-md.jpeg',
      hoursPlayed: 19,
      isActive: true,
      tags: 'GM, Arcodd',
      sCreate: new Date('2019-04-03'),
      sUpdate: new Date('2021-05-28'),
      idUserType: 300,
      userTypeTitle: 'Paying Storyteller',
      userTypeNotes: 'Encourage',
    } as CardUser;

    console.log('AuthService::checkSavedUser(): make fake user', faker);
    this.currentUser$.next(faker);
    this.authInfo = {
      user: { displayName: faker.userName, email: faker.userEmail },
      token: this.testToken,
    };

    this.loginUser(faker);
    return true;

    const token = localStorage.getItem(environment.APP_NAME + '-Token');
    const savedUser =
      localStorage.getItem(environment.APP_NAME + '-User') ?? '';
    const dataUrl = localStorage.getItem(environment.APP_NAME + '-Server');

    if (token && savedUser && dataUrl === environment.DATA_URL) {
      console.log(
        'AuthService::checkSavedUser - user exists!',
        token,
        'user: ',
        savedUser
      );
      const convertedUser = JSON.parse(savedUser) as CardUser;

      this.loginUser(convertedUser);

      return true;
    } else {
      // console.log('could not login saved user ', savedUser, token, ' at ', serverurl);
      return false;
    }
  }

  saveUser(user: CardUser): void {
    console.log('Auth::saveUser', user);

    this.currentUser$.next(user);
    this.logger.me = user;

    try {
      localStorage.setItem(
        environment.APP_NAME + '-Token',
        this.authInfo?.token
      );
      localStorage.setItem(
        environment.APP_NAME + '-User',
        JSON.stringify(user)
      );
      // localStorage.setItem(
      //   environment.APP_NAME + '-Server',
      //   environment.DATA_URL
      // );
    } catch (err) {
      this.logger.logErrObject(
        'AuthService::saveUser',
        err,
        'User Information could not be saved to the browser.'
      );
    }
  }

  validTestLogin(): boolean {
    return (
      this.loggedIn &&
      this.getCurrentUser() &&
      this.authInfo?.token === this.testToken
    );
  }

  isLoggedIn(): boolean {
    return (
      this.loggedIn &&
      this.getCurrentUser() &&
      typeof this.authInfo?.token === 'string'
    ); // && this.authInfo?.user?.email;
  }

  loggedIn$(): Observable<boolean> {
    return of(
      this.loggedIn &&
        this.getCurrentUser() &&
        this.authInfo?.token === this.testToken
    );
  }
  isSysAdmin(): boolean {
    return this.isLoggedIn() && this.me().idUserType === 13;
  }

  isProduction(): boolean {
    return environment.production;
  }
}
