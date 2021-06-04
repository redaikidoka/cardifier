import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/root/system.service';

@Component({
  selector: 'cf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  date = new Date().getFullYear();
  version: string = '';

  constructor(private systemService: SystemService) {
    this.version = this.systemService.getVersion();
  }

  ngOnInit(): void {}
}
