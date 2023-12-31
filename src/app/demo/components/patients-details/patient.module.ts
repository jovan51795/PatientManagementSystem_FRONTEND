import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsRoutingModule } from './patient-routing.module';
import { PatientsDetailsComponent } from './patients-details.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@NgModule({
    declarations: [PatientsDetailsComponent],
    imports: [
        CommonModule,
        PatientDetailsRoutingModule,
        SharedModule,
        ButtonModule,
        ImageModule,
    ],
})
export class PatientModule {}
