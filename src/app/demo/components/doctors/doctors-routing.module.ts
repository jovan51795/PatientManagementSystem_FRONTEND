import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: DoctorsComponent }]),
    ],
    exports: [RouterModule],
})
export class DoctorsRoutingModule {}
