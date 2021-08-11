import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

import {map, tap, catchError} from 'rxjs/operators';

import {CardUser} from '../core/data/card-user';

import {LoggerService} from './logger.service';

import {UnsubscribeOnDestroyAdapter} from './unsubscribe-on-destroy-adapter';
import {AngularFirestore} from '@angular/fire/firestore';
import {Game} from '../core/data/game';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UnsubscribeOnDestroyAdapter {
  me: CardUser | null;
  private userCache: CardUser[] = [];

  static getInitials(userName: string): string {
    if (!userName) {
      return '';
    }

    return userName
      .trim()
      .split(' ')
      .reduce(
        (acc, cur, idx, arr) =>
          acc +
          (arr.length > 1
            ? idx === 0 || idx === arr.length - 1
              ? cur.substring(0, 1)
              : ''
            : cur.substring(0, 2)),
        ''
      )
      .toUpperCase();
  }

  // static dataToCardUserQuery(loadedUser: any, queryName: string): CardUser {
  //   // console.log('UserService::datatoCardUser', loadedUser);
  //   return loadedUser.data[queryName];
  // }


  constructor(private logger: LoggerService, private afs: AngularFirestore) {
    super();

    this.me = null;
  }

  setUser(user: CardUser): void {
    this.me = user;
  }


  getUser$(idUser: string, force = false): Observable<CardUser | undefined> {
    if (!force && this.userCache.filter(cached => cached.idUser === idUser)) {
      // console.log('user.Service::getUser$ - have cache', idUser);
      return of(this.userCache.filter(cached => cached.idUser === idUser)[0]);
    }

    return this.afs.collection<CardUser>('users').doc(idUser).valueChanges().pipe(
      tap(user => console.log('UserService::getUser$', idUser, user))
    );

  }

  cacheUsers(userIds: string[]): number {
    if (userIds.length < 1) { return 0; }

    let cacheCount = 0;

    this.subs.sink = this.afs.collection<CardUser>('users', ref => ref.where('idUser', 'in', userIds)).valueChanges().subscribe(
      users => {

        users.forEach(u  => {
          const found = this.userCache.filter(cached => cached.idUser === u.idUser);
          if ( !found || found.length < 1 ) {
            console.log('user.Service::cacheUsers - caching', u.idUser);
            this.userCache.push(u);
            cacheCount++;
          }
        });

        // console.log('user.service.cacheUsers() - final cache', this.userCache);

      }
    );

    return cacheCount;
  }

  clearCache(): void {
    this.userCache = [];
  }


  getUserByEmail(email: string): Observable<CardUser> {
    // const qSingleUser = gql`{ allCardUsersList(condition: {userEmail: "${email}"}) {
    //     ${usrFields}
    //   }  }`;

    // console.log('UserService::getUserByEmail', email, qSingleUser);
    // // return new Observable((observer: Observer<CardUser>) => {
    // return this.apollo.query<any>({query: qSingleUser}).pipe(
    //   map(userData => UserService.dataToCardUsers(userData))
    // );
    return of({} as CardUser);
  }

  userList$(limit = 10): Observable<CardUser[]> {

    console.log('UserService::userList$');

    return this.afs.collection<CardUser>('users', ref => ref.limit(limit)).valueChanges().pipe(
      tap(users => console.log('userService::userList$', users))
    );

    // return this.apollo.query<any>({query: qCardUserActive}).pipe(
    //   tap(res => console.log('UserService::getUserList', res),
    //     err =>
    //       this.logger.logErrObject( 'UserService::getUserList()', err, 'Could not load user list')),
    //   map(userData => UserService.dataToCardUsers(userData))
    // );
  }

  // getAppAccessUserList(idApp: number, accessLevel: number): Observable<CardUser[]> {

  //   const qAppUsers = gql`
  //     {
  //       allCardUsersList(condition: {isActive: true, idAdmApp: ${idApp}, idUserType: ${accessLevel} } , orderBy: USER_NAME_ASC) {
  //         ${usrFields}
  //       }
  //     } `;

  //   console.log('UserService::getAppAccessUserList', idApp, accessLevel, qAppUsers);

  //   return this.apollo.query<any>({query: qAppUsers}).pipe(
  //     tap(res => console.log('UserService::getUserList', res),
  //       err =>
  //         this.logger.logErrObject( 'UserService::getUserList()', err, 'Could not load user list')),
  //     map(userData => userData.data.allCardUsersList )
  //   );
  // }
  // loadNotify(force: boolean = false): Observable<UsrNotify[] > | null {
  //
  //   console.assert(this.me, 'UserService::loadNotify(): I should have a user' );
  //
  //   if (!this.me || !this.me.idAdmUser) {
  //     return null;
  //   }
  //
  //   if (!force && this.idUserNotifications === this.me.idAdmUser) {
  //     return null;
  //   }
  //
  //   return this.getUserNotify(this.me.idAdmUser).pipe(
  //     map(notifies => {
  //         this.notifications.next(notifies);
  //         this.idUserNotifications = this.me.idAdmUser;
  //       }
  //     )
  //   );
  //
  // }

  // private getUserNotify(idUser: number) {
  //   const qUsrNotify = gql`{
  //     allUsrNotifies(orderBy: S_CREATE_DESC, first:10, condition: {idAdmUser: ${idUser}, idAdmApp: ${this.app.idAdmApp} }) {
  //       nodes {
  //         idAdmUser
  //         idNotify
  //         isRead
  //         linkedId
  //         linkedObject
  //         linkedUser
  //         message
  //         readReceipt
  //         sCreate
  //         sUpdate
  //         idAdmApp
  //       }
  //     }
  //   } `;
  //
  //   // console.log('Userz::getusernotify', idUser, qUsrNotify);
  //
  //   return this.apollo.query<any>({query: qUsrNotify}).pipe(
  //     map(notifications => UserService.dataToUsrNotify(notifications)),
  //     catchError(err => {
  //         this.logger.logErrObject(this.me, 'UserService::getUserNotify', err, 'Could not load notifications');
  //         return throwError(err);
  //       }
  //     )
  //   );
  //
  // }

  // readAllNotifications(idUser: number, idApp: number) {
  //
  //   // const found = this.notifications.getValue().find(n => n.idNotify === idNotify);
  //   // console.log('UserService::readNotification ', found);
  //   // const found = (findMe && findMe.length > 0) ? findMe[0] : null;
  //   // const readReceipt = found ? found.readReceipt : false;
  //   const qUpdate = gql`mutation {
  //     readAllNotifies(input: {iduser: ${idUser}, idapp: ${idApp}}) {
  //       clientMutationId
  //     }
  //   }
  //   `;
  //
  //
  //   console.log('UZerz::readAllNotifications', idUser, qUpdate);
  //
  //   return this.apollo.mutate<any>({mutation: qUpdate}).pipe(
  //     tap(response => console.log('UZerz::readAllNotifications Marked Read', response)),
  //     map(res =>  this.loadNotify(true) )
  //   );
  //
  // }

  // makeNotify(idUser: number, message: string,
  //            linkedObject: number, linkedId: number, linkedIdUser: number) {
  //
  //   const qMakeNotify = gql`mutation {
  //     createUsrNotify(input: {usrNotify:
  //     {idAdmUser: ${idUser},
  //       message: \"${message}\",
  //       linkedUser: ${linkedIdUser},
  //       linkedObject: ${linkedObject},
  //       linkedId: ${linkedId},
  //       idAdmApp: ${this.app.idAdmApp},
  //       sCreateUser: ${this.me.idAdmUser}
  //     }
  //     }) {
  //       clientMutationId
  //       __typename
  //       usrNotify {
  //         idAdmApp
  //         idAdmUser
  //         idNotify
  //         isRead
  //         linkedId
  //         linkedObject
  //         linkedUser
  //         message
  //         nodeId
  //         readReceipt
  //       }
  //     }
  //   }`;
  //
  //   console.log('UZerz::makeNotify', idUser, message, linkedObject, linkedId, linkedIdUser);
  //
  //   return this.apollo.mutate<any>({mutation: qMakeNotify}).pipe(
  //     tap(response => console.log('UserService::made the Notify', response),
  //       err => this.logger.logErrObject(this.me, 'userService::MakeNotify', err,
  //         'Could not make the notification for ' + idUser + ' ' + message + ' ' + linkedObject +
  //         ': ' + linkedId + '::' + linkedIdUser)
  //     )
  //   );
  // }

  // readNotification(idNotify: number) {
  //
  //   const found = this.notifications.getValue().find(n => n.idNotify === idNotify);
  //   console.log('UserService::readNotification ', found);
  //
  //   const readReceipt = found ? found.readReceipt : false;
  //   const qUpdate = gql`mutation {
  //     updateUsrNotifyByIdNotify(input: {usrNotifyPatch:
  //     {isRead: true, sUpdateUser: ${this.me.idAdmUser}}, idNotify: ${idNotify}})
  //     {
  //       clientMutationId
  //       __typename
  //       usrNotify {
  //         isRead
  //         idNotify
  //       }
  //     }
  //   }`;
  //
  //   console.log('UZerz::readNotification', idNotify, qUpdate);
  //
  //   return this.apollo.mutate<any>({mutation: qUpdate}).pipe(
  //     tap(response => {
  //         console.log('UZerz::readNotification Marked Read', response);
  //
  //         let notes = this.notifications.getValue();
  //         if (notes) {
  //           console.log('UZerz::readNotification marking cache read');
  //           const location = notes.find(n => n.idNotify === idNotify);
  //           location.isRead = true;
  //           this.notifications.next(notes);
  //
  //           // if (readReceipt) {
  //           //   this.makeNotify(found.linkedUser, this.me.userName + '\'s notification \'' + found.message + '\' has been read.',
  //           //     null, null, this.me.idAdmUser);
  //           // }
  //         }
  //       }
  //       // err => {
  //       //   this.logger.logErrObject(this.me, 'UZerz::readNotification', err,
  //       //     'Could not update Notification to isRead');
  //       //   observer.error(err);
  //     ),
  //     catchError(err => {
  //       this.logger.logErrObject(this.me, 'UZerz::readNotification', err, 'Could not update Notification to isRead');
  //       return of([]);
  //     }),
  //   );
  // }

  getUserTypeIcon(): string {
    return this.me ? this.userIcon(this.me.idUserType) : this.userIcon(-1);
  }

  // TODO: use the user type table!
  userIcon(idUserType: number): string {
    switch (idUserType) {
      case 13: // sysadmin
        return 'user-secret';
      case 100: // admin
        return 'user-ninja';
      case 200: // storyteller
        return 'user-tie';
      case 300: // user
        return 'user';
      default:
        return 'user';
    }
  }
}
