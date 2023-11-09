import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
        ) { }

    public userForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required, Validators.minLength(8)]]
    })

    login() {
        const user : User = this.userForm.getRawValue() as User
        this.authService.login(user).subscribe(data => {
            if(data.token) {
                sessionStorage.setItem("pms-user", data.token)
                this.router.navigate([''])
            }
        })
    }
}
