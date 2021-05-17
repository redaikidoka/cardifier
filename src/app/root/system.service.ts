import { Injectable } from '@angular/core';
import {version} from "../../../package.json";

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
}
