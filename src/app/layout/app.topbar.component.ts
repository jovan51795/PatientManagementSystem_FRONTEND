import {
    Component,
    ElementRef,
    ViewChild,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    items2: MenuItem[] | undefined;
    user!: any;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    subscriber: Subscription;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getUserDetauls();
        setTimeout(() => {
            this.items2 = [
                {
                    label: this.user
                        ? this.user.firstname.toUpperCase() +
                          ' ' +
                          this.user.lastname.toUpperCase()
                        : '',
                    items: [
                        {
                            label: 'Sign out',
                            icon: 'pi pi-fw pi-power-off',
                            command: () => {
                                this.logout();
                            },
                        },
                        {
                            separator: true,
                        },
                    ],
                },
            ];
        }, 300);
    }

    logout() {
        sessionStorage.removeItem('pms-user');
        // window.location.reload();
        this.router.navigate(['/auth/login']);
    }

    getUserDetauls() {
        this.subscriber = this.authService.getUserDetails().subscribe((x) => {
            if (x.status === 1) {
                this.user = x.data;
                console.log(x.data.firstname);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
