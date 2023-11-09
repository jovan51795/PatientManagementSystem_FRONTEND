import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IDoctor } from 'src/app/interfaces/docker';
import { IPatient } from 'src/app/interfaces/patient';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patients/patient.service';

@Component({
    selector: 'app-patients-form',
    templateUrl: './patients-form.component.html',
    styleUrls: ['./patients-form.component.scss'],
    providers: [MessageService],
})
export class PatientsFormComponent implements OnInit {
    gender: string = '';
    status: string[] = [
        'ACTIVE',
        'DISCHARGED',
        'ON_HOLD',
        'DECEASED',
        'SCHEDULED',
        'NO_SHOW',
        'CANCELLED',
        'IN_TREATMENT',
        'RECOVERED',
        'CRITICAL',
        'PENDING_ADMISSION',
    ];

    doctors: IDoctor[] = [];
    public patientForm = this.fb.group({
        id: [''],
        first_name: ['', [Validators.required]],
        middle_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        place_of_birth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        contact: ['', [Validators.required]],
        emergency_contact: ['', [Validators.required]],
        status: ['', [Validators.required]],
        patientRecords: this.fb.array([
            this.fb.group({
                id: [],
                file: [null],
                prescriptions: [''],
                notes: [''],
                diagnose: [''],
                physician: [null],
            }),
        ]),
    });
    constructor(
        private doctorService: DoctorService,
        private fb: FormBuilder,
        private patientService: PatientService,
        private service: MessageService
    ) {}

    ngOnInit(): void {
        this.getAllDoctor();
    }

    getAllDoctor() {
        return this.doctorService.getAllDoctors().subscribe((x) => {
            if (x.status === 1) {
                this.doctors = x.data;
            }
        });
    }

    submit() {
        const patientData = this.patientForm.getRawValue() as IPatient;
        this.patientService.save(patientData).subscribe((x) => {
            if (x.status === 1) {
                this.showSuccessViaToast(x.message);
            }
        });
    }

    get getPatientRecord(): FormArray {
        return this.patientForm.get('patientRecords') as FormArray;
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
