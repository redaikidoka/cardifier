import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/root/auth.service';

@Component({
  selector: 'cf-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  me$ = this.auth.me$;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
