import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsHistoryRoutingModule } from './patients-history-routing.module';
import { PatientsHistoryComponent } from './patients-history.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [PatientsHistoryComponent],
    imports: [
        CommonModule,
        PatientsHistoryRoutingModule,
        SharedModule,
        ImageModule,
        ButtonModule,
    ],
})
export class PatientsHistoryModule {}
