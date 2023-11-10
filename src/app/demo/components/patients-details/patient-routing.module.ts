import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsDetailsComponent } from './patients-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: PatientsDetailsComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class PatientDetailsRoutingModule {}
