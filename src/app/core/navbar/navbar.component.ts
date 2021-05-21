import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/root/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu = false;

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
  constructor(userService: UserService) {}

  ngOnInit(): void {}
}
