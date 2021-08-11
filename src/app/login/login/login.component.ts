import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/root/auth.service';

import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';
import {Observable} from 'rxjs';
import {CardUser} from '../../core/data/card-user';
import {UserService} from '../../root/user.service';
import {SystemService} from '../../root/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {
  users$: Observable<CardUser[] | undefined>;
  isProduction: boolean ;

  constructor(private auth: AuthService, private userService: UserService, private system: SystemService) {
    super();

    this.users$ = this.userService.userList$();
    this.isProduction = this.system.isProduction();

  }

  ngOnInit(): void {}

  doTestLogin(): void {
    this.subs.sink = this.auth.testLogin('pol').subscribe(usr => {
      console.log('Login::doTestLogin() of', usr);
    });
  }
  testLogin(idUser: string): void {
    this.subs.sink = this.auth.testLogin(idUser).subscribe(usr => {
      console.log('Login::doTestLogin() of', usr);
    });
  }

userIcon(idUserType: number): string {
  // console.log('login.userIcon', idUserType);
  return AuthService.userIcon(idUserType);
}
}
