import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent {
    items!: MenuItem[];
    customers1: Customer[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService) {}

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
}
