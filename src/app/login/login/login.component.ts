import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/root/auth.service';

import {UnsubscribeOnDestroyAdapter} from '../../root/unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {
  constructor(private auth: AuthService) {
    super();
  }

  ngOnInit(): void {}

  doTestLogin(): void {
    this.subs.sink = this.auth.testLogin(1).subscribe(usr => {
      console.log('Login::doTestLogin() of', usr);
    });
  }
}
