import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsHistoryComponent } from './patients-history.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: PatientsHistoryComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class PatientsHistoryRoutingModule {}
