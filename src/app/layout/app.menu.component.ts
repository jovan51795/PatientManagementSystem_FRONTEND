import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                    {
                        label: 'Patients',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/patients'],
                    },
                    {
                        label: 'Doctors',
                        icon: 'pi pi-fw pi-shield',
                        routerLink: ['/doctors'],
                    },
                ],
            },

        ];
    }
}
