import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsFormComponent } from './patients-form.component';
import { PatientsFormRoutingModule } from './patients-form-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [PatientsFormComponent],
    imports: [
        CommonModule,
        PatientsFormRoutingModule,
        InputTextModule,
        RadioButtonModule,
        FormsModule,
        DropdownModule,
        InputTextareaModule,
        ButtonModule,
        SharedModule,
        ToastModule,
    ],
})
export class PatientsFormModule {}
