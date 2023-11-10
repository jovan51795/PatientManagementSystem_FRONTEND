import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PatientsComponent } from './patients.component';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [PatientsComponent],
    imports: [
        CommonModule,
        StyleClassModule,
        TableModule,
        PatientsRoutingModule,
        PanelMenuModule,
        MenuModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
        MessageModule,
        MessagesModule,
        OverlayPanelModule,
        ToastModule,
        TooltipModule,
    ],
})
export class PatientsModule {}
