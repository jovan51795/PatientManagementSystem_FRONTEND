import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsFormComponent } from './patients-form.component';
import { PatientsFormRoutingModule } from './patients-form-routing.module';

@NgModule({
    declarations: [PatientsFormComponent],
    imports: [CommonModule, PatientsFormRoutingModule],
})
export class PatientsFormModule {}
