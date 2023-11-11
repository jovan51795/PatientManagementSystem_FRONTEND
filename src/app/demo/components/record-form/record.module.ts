import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordRoutingModule } from './record-routing.module';
import { RecordFromComponent } from './record-from.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [RecordFromComponent],
    imports: [
        CommonModule,
        RecordRoutingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        FormsModule,
        SharedModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        ButtonModule,
        FileUploadModule,
    ],
})
export class RecordModule {}
