import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    valCheck: string[] = ['remember'];

    //password!: string;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router

        ){}

    public registerForm = this.fb.group({
        firstname: ['',[Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    })

    register() {
        const user: User = this.registerForm.getRawValue() as User;
        this.authService.register(user).subscribe(data => {
            if(data.token) {
                this.router.navigate(['/auth/login'])
            }
        })
    }

}
