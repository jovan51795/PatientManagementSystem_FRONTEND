import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsHistoryRoutingModule } from './patients-history-routing.module';
import { PatientsHistoryComponent } from './patients-history.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ImageModule } from 'primeng/image';

@NgModule({
    declarations: [PatientsHistoryComponent],
    imports: [
        CommonModule,
        PatientsHistoryRoutingModule,
        SharedModule,
        ImageModule,
    ],
})
export class PatientsHistoryModule {}
