import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routine.module';

import { CoreModule } from '../core/core.module';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule, CoreModule,
        LoginRoutingModule, MatTooltipModule
    ]
})
export class LoginModule { }
