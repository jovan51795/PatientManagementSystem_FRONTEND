import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IDoctor } from 'src/app/interfaces/docker';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
    selector: 'app-patients-form',
    templateUrl: './patients-form.component.html',
    styleUrls: ['./patients-form.component.scss'],
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
                prescriptions: [''],
                notes: [''],
                diagnose: [''],
                physician: [null],
            }),
        ]),
    });
    constructor(
        private doctorService: DoctorService,
        private fb: FormBuilder
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
        const patientData = this.patientForm.getRawValue();
        console.log(patientData);
    }

    get getPatientRecord(): FormArray {
        return this.patientForm.get('patientRecords') as FormArray;
    }
}
