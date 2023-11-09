import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [DoctorsComponent],
    imports: [
        CommonModule,
        DoctorsRoutingModule,
        StyleClassModule,
        TableModule,
        PanelMenuModule,
        MenuModule,
        InputTextModule,
        ButtonModule,
    ],
})
export class DoctorsModule {}
