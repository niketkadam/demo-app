
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'management', component: ManagementComponent },
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
