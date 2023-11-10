import { OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IDoctor } from 'src/app/interfaces/docker';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patients/patient.service';
import { IPatientRecord } from 'src/app/interfaces/patient';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-record-from',
    templateUrl: './record-from.component.html',
    styleUrls: ['./record-from.component.scss'],
    providers: [MessageService],
})
export class RecordFromComponent {
    doctors: IDoctor[] = [];
    patientId: string = null;
    constructor(
        private doctorService: DoctorService,
        private fb: FormBuilder,
        private patientService: PatientService,
        private route: ActivatedRoute,
        private service: MessageService
    ) {}

    public record = this.fb.group({
        file: [null],
        prescriptions: ['', [Validators.required]],
        diagnose: ['', [Validators.required]],
        notes: ['', [Validators.required]],
        physician: [null],
    });
    ngOnInit(): void {
        this.getAllDoctors();
        this.route.paramMap.subscribe((x) => {
            if (x.get('id')) {
                this.patientId = x.get('id');
            }
        });
    }

    getAllDoctors() {
        this.doctorService.getAllDoctors().subscribe((s) => {
            if (s.status === 1) {
                this.doctors = s.data;
            }
        });
    }

    addPatientRecord() {
        const patientRec = this.record.getRawValue() as IPatientRecord;
        this.patientService
            .addPatientRecord(this.patientId, patientRec)
            .subscribe((x) => {
                if (x.status === 1) {
                    this.showSuccessViaToast(x.message);
                } else if (x.status === 0) {
                    this.showErrorViaToast(x.message);
                }
            });
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
