import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsFormComponent } from './patients-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: PatientsFormComponent }]),
    ],
    exports: [RouterModule],
})
export class PatientsFormRoutingModule {}
