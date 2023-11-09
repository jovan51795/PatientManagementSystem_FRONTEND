import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { LoginModule } from './login/login.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        LoginModule
    ],
    declarations: [
    ],
})
export class AuthModule { }
