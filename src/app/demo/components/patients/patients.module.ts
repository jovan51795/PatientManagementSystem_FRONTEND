import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PatientsComponent } from './patients.component';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    StyleClassModule,
    TableModule,
    PatientsRoutingModule,
    PanelMenuModule,
    MenuModule,
    InputTextModule,
    ButtonModule
  ]
})
export class PatientsModule { }
