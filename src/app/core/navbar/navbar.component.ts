import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/root/auth.service';

@Component({
  selector: 'cf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  me$ = this.auth.me$;
  loggedIn$ = this.auth.loggedIn$();

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
