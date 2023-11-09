import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { FormBuilder, Validators } from '@angular/forms';
import { IDoctor } from 'src/app/interfaces/docker';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.scss'],
    providers: [MessageService],
})
export class DoctorsComponent {
    items!: MenuItem[];
    customers1: Customer[] = [];
    loading: boolean = true;
    display: boolean = false;
    msgs: Message[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private fb: FormBuilder,
        private doctorService: DoctorService,
        private service: MessageService
    ) {}

    public doctorForm = this.fb.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        specialization: ['', [Validators.required]],
    });

    submit() {
        this.display = false;
        const doctor: IDoctor = this.doctorForm.getRawValue() as IDoctor;
        this.doctorService.save(doctor).subscribe((data) => {
            if (data.status === 1) {
                console.log(data);
                this.showSuccessViaToast(data.message);
            } else if (data.status === 0) {
                this.showErrorViaToast(data.message);
            }
        });
    }

    ngOnInit(): void {
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(
                (customer) =>
                    (customer.date = new Date(customer.date).toDateString())
            );
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
            detail: 'Data ' + message,
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
