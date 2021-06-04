import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/root/auth.service';

@Component({
  selector: 'app-bye',
  templateUrl: './bye.component.html',
  styleUrls: ['./bye.component.scss'],
})
export class ByeComponent implements OnInit {
  constructor(private auth: AuthService) {
    console.log('Logout()');
    this.auth.logout(false);
  }

  ngOnInit(): void {}
}
