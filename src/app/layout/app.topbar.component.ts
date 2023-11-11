import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];
    items2: MenuItem[] | undefined;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router) {}

    ngOnInit(): void {
        this.items2 = [
            {
                label: 'Jovanie Cabatuan',
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
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link',
                    },
                ],
            },
        ];
    }

    logout() {
        sessionStorage.removeItem('pms-user');
        // window.location.reload();
        this.router.navigate(['/auth/login']);
    }
}
