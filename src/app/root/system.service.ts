import { Injectable } from '@angular/core';
import {version} from "../../../package.json";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private appVersion: string ;

  constructor() {
    this.appVersion = version;
  }

  getVersion(): string {
    return this.appVersion;
  }

  getAppName(): string {
    return environment.APP_NAME;
  }
}
