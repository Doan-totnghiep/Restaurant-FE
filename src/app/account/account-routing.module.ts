import { AuthGuard } from './../_helpers/auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { LayoutComponent } from './layout.component';

import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegistrationComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
