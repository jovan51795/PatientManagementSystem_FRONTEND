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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

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
        OverlayPanelModule,
        DialogModule,
        FormsModule,
        PasswordModule,
        ButtonModule,
        SharedModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        InputTextModule,
    ],
})
export class DoctorsModule {}
