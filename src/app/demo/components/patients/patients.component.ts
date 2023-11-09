import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { PatientService } from 'src/app/services/patients/patient.service';
import { IPatient } from 'src/app/interfaces/patient';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
    providers: [MessageService],
})
export class PatientsComponent implements OnInit {
    items!: MenuItem[];
    loading: boolean = true;
    patients: IPatient[] = [];
    deleteModal: boolean = false;
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private patientService: PatientService,
        private service: MessageService
    ) {}

    ngOnInit(): void {
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];

        this.getAllPatients();
    }

    getAllPatients() {
        this.patientService.getAllPatients().subscribe((x) => {
            if (x.status === 1) {
                this.loading = false;
                this.patients = x.data;
            }
        });
    }

    delete(id: string) {
        this.patientService.delete(id).subscribe((data) => {
            if (data.status === 1) {
                this.showSuccessViaToast(data.message);
                this.getAllPatients();
            } else if (data.status === 2) {
                this.showErrorViaToast(data.message);
            }
            this.deleteModal = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    showSuccessViaToast(message: string) {
        this.service.add({
            key: 'tst',
            severity: 'success',
            summary: 'Message',
            detail: message,
        });
    }

    showErrorViaToast(message: string) {
        this.service.add({
            key: 'tst',
            severity: 'error',
            summary: 'Message',
            detail: message,
        });
    }
}
