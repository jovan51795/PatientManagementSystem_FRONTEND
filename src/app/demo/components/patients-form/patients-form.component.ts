import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    isUpdate: boolean = false;
    patientId: string = null;
    public patientForm = this.fb.group({
        id: [''],
        first_name: ['', [Validators.required]],
        middle_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        birthday: ['', [Validators.required, this.validateAge]],
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
        private service: MessageService,
        private route: ActivatedRoute
    ) {}

    uploadedFiles: any[] = [];

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    validateAge(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value) {
            const birthday = new Date(control.value);
            const today = new Date();
            const age = today.getFullYear() - birthday.getFullYear();
            const monthDiff = today.getMonth() - birthday.getMonth();

            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthday.getDate())
            ) {
                return age - 1 < 15 ? { ageInvalid: true } : null;
            }

            return age < 15 ? { ageInvalid: true } : null;
        }

        return null;
    }

    ngOnInit(): void {
        this.getAllDoctor();
        this.route.paramMap.subscribe((x) => {
            if (x.get('id')) {
                this.patientId = x.get('id');
                this.getPatientDetials(x.get('id'));
                this.isUpdate = true;
            }
        });
    }

    getAllDoctor() {
        return this.doctorService.getAllDoctors().subscribe((x) => {
            if (x.status === 1) {
                this.doctors = x.data;
            }
        });
    }

    getPatientDetials(id: string) {
        this.patientService.getDetails(id).subscribe((x) => {
            if (x.status === 1) {
                console.log('details', x.data);
                const pd = { ...x.data };
                this.getLatestRecord(pd);
            }
        });
    }

    patientRecordCopy: any = null;
    getLatestRecord(record: any) {
        if (record.patientRecords) {
            var patientRec = record;
            this.patientRecordCopy = [...record.patientRecords];
            const latest = record.patientRecords.reduce(
                (maxItem, currentItem) =>
                    currentItem.id > maxItem.id ? currentItem : maxItem
            );
            patientRec.patientRecords = [latest];
            this.patientForm.patchValue(patientRec);
        }
    }

    submit() {
        const patientFile = new FormData();
        for (let files of this.uploadedFiles) {
            patientFile.append('file', files);
        }

        const patientData = this.patientForm.getRawValue() as IPatient;

        if (!this.uploadedFiles.length) {
            this.patientService.saveWithoutFile(patientData).subscribe((x) => {
                if (x.status === 1) {
                    this.showSuccessViaToast(x.message);
                }
            });
        } else {
            this.patientService
                .save(patientData, patientFile)
                .subscribe((x) => {
                    if (x.status === 1) {
                        this.showSuccessViaToast(x.message);
                    }
                });
        }
    }

    update() {
        var patientFile = new FormData();
        const patientData = this.patientForm.getRawValue() as IPatient;
        for (let files of this.uploadedFiles) {
            patientFile.append('file', files);
        }
        if (!this.uploadedFiles.length) {
            this.patientService
                .updateWithoutFile(patientData)
                .subscribe((x) => {
                    if (x.status === 1) {
                        this.showSuccessViaToast(x.message);
                        this.getPatientDetials(this.patientId);
                    }
                });
        } else {
            patientData.patientRecords[0].file = null;
            console.log('the patient data', patientData);
            this.patientService
                .update(patientData, patientFile)
                .subscribe((x) => {
                    if (x.status === 1) {
                        this.showSuccessViaToast(x.message);
                        this.getPatientDetials(this.patientId);
                    }
                });
        }
    }

    get getPatientRecord(): FormArray {
        return this.patientForm.get('patientRecords') as FormArray;
    }

    remove(e: any) {
        this.uploadedFiles = this.uploadedFiles.filter(
            (file) => file !== e.file
        );
        console.log('File removed:', e.file);
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
