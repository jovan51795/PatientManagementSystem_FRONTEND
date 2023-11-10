import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsHistoryRoutingModule } from './patients-history-routing.module';
import { PatientsHistoryComponent } from './patients-history.component';

@NgModule({
    declarations: [PatientsHistoryComponent],
    imports: [CommonModule, PatientsHistoryRoutingModule],
})
export class PatientsHistoryModule {}
