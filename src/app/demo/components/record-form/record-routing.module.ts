import { NgModule, OnInit } from '@angular/core';
import { RecordFromComponent } from './record-from.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: RecordFromComponent }]),
    ],
    exports: [RouterModule],
})
export class RecordRoutingModule {}
