import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LayoutComponent } from './layout.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
  declarations: [
    LayoutComponent,
    RegistrationComponent,
    LoginComponent


  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
   FormsModule
  ],
  providers: [],

})
export class AccountModule { }
