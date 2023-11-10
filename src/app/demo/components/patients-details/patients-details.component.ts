import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPatient, IPatientRecord } from 'src/app/interfaces/patient';
import { IResponse } from 'src/app/interfaces/response';
import { PatientService } from 'src/app/services/patients/patient.service';

@Component({
    selector: 'app-patients-details',
    templateUrl: './patients-details.component.html',
    styleUrls: ['./patients-details.component.scss'],
})
export class PatientsDetailsComponent implements OnInit {
    patient: IPatient = undefined;
    record: IPatientRecord = undefined;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private patientService: PatientService
    ) {}
    ngOnInit(): void {
        this.route.paramMap.subscribe((x) => {
            this.getDetails(x.get('id'));
        });
    }

    getDetails(id: string) {
        this.patientService.getDetails(id).subscribe((data) => {
            console.log(data);
            if (data.status === 1) {
                this.patient = data.data;
                this.getLatestRecord(data.data);
            } else {
                this.router.navigate(['/patients']);
            }
        });
    }

    getLatestRecord(patientDet: IPatient) {
        // Assuming your data is stored in a variable named responseData
        const patientRecords = patientDet.patientRecords;

        // Find the index of the record with the maximum id using Array.reduce
        const indexOfRecordWithMaxId = patientRecords.reduce(
            (maxIndex, currentRecord, currentIndex, array) => {
                const currentRecordId = currentRecord.id || 0; // Make sure to handle cases where id is undefined

                return currentRecordId > (array[maxIndex].id || 0)
                    ? currentIndex
                    : maxIndex;
            },
            0
        );

        // Remove the record with the maximum id from patientRecords
        this.record = patientRecords.splice(indexOfRecordWithMaxId, 1)[0];
        console.log(this.record);
    }
}
