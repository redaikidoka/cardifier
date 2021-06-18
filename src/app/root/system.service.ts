import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

// @ts-ignore
// import { version } from '../../../package.json';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private appVersion: string;

  constructor() {
    this.appVersion = '12.0.2021-06-17';
  }

  getVersion(): string {
    return this.appVersion;
  }

  getAppName(): string {
    return environment.APP_NAME;
  }
}
