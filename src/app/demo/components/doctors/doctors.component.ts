import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
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
export class DoctorsComponent implements OnInit {
    items!: MenuItem[];
    doctors: Array<IDoctor> = [];
    loading: boolean = true;
    display: boolean = false;
    msgs: Message[] = [];
    modalTitle: string = '';
    updateForm: boolean = false;
    deleteModal: boolean = false;
    viewModal: boolean = false;
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private fb: FormBuilder,
        private doctorService: DoctorService,
        private service: MessageService
    ) {}

    public doctorForm = this.fb.group({
        id: [''],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        specialization: ['', [Validators.required]],
    });

    add(title: string) {
        this.modalTitle = title;
        this.display = true;
    }

    submit() {
        this.display = false;
        const doctor: IDoctor = this.doctorForm.getRawValue() as IDoctor;
        this.doctorService.save(doctor).subscribe((data) => {
            if (data.status === 1) {
                this.showSuccessViaToast('Data ' + data.message);
                this.getAllDoctor();
            } else if (data.status === 0) {
                this.showErrorViaToast(data.message);
            }
            this.doctorForm.reset();
        });
    }

    getAllDoctor() {
        this.doctorService.getAllDoctors().subscribe((data) => {
            if (data.status === 1) {
                console.log(data);
                this.doctors = data.data;
            }
            this.loading = false;
        });
    }

    delete(id: string) {
        this.doctorService.delete(id).subscribe((data) => {
            if (data.status === 1) {
                this.showSuccessViaToast(data.message);
                this.getAllDoctor();
            }
            this.deleteModal = false;
        });
    }

    update(doctor: IDoctor, title: string) {
        this.updateForm = true;
        this.modalTitle = title;
        this.doctorForm.patchValue(doctor);
        this.display = true;
    }

    onHide(e) {
        this.deleteModal = false;
        this.updateForm = false;
        this.viewModal = false;
        this.doctorForm.enable();
    }

    updateDoctor() {
        this.display = false;
        const doctor: IDoctor = this.doctorForm.getRawValue() as IDoctor;
        this.doctorService.update(doctor).subscribe((data) => {
            if (data.status === 1) {
                this.showSuccessViaToast('Data ' + data.message);
                this.getAllDoctor();
            } else if (data.status === 0) {
                this.showErrorViaToast(data.message);
            }
            this.doctorForm.reset();
        });
    }
    viewDetails(doctor: IDoctor) {
        this.modalTitle = 'View Details';
        this.viewModal = true;
        this.doctorForm.patchValue(doctor);
        this.doctorForm.disable();
        //this.doctorForm.enable();
        this.display = true;
    }
    closeViewModal() {
        this.viewModal = false;
        this.display = false;
    }
    ngOnInit(): void {
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];

        this.getAllDoctor();
    }

    onGlobalFilter(table: Table, event: Event) {
        console.log(table, event);
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
