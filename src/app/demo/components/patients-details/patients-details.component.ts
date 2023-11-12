import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
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
    patient?: IPatient;
    record?: IPatientRecord;
    loaded: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private patientService: PatientService,
        private sanitizer: DomSanitizer
    ) {}
    ngOnInit(): void {
        const paramtSubs = this.route.paramMap.subscribe((x) => {
            this.getDetails(x.get('id'));
        });
        // this.subscriber$.add(paramtSubs);
    }

    getDetails(id: string) {
        const detailsSubs = this.patientService
            .getDetails(id)
            .subscribe((data) => {
                if (data.status === 1) {
                    this.patient = data.data;
                    this.loaded = true;
                    this.getLatestRecord(data.data);
                } else {
                    this.router.navigate(['/patients']);
                }
            });
        // this.subscriber$.add(detailsSubs);
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

        this.record = patientRecords.splice(indexOfRecordWithMaxId, 1)[0];
        this.convertToObjectUrl(this.record);
    }

    convertToObjectUrl(patientRecords: any) {
        if (patientRecords) {
            patientRecords.file.forEach((file) => {
                let objectURL = 'data:image/png;base64,' + file.file;
                file.file = this.sanitizer.bypassSecurityTrustUrl(objectURL); //URL.createObjectURL(blob);
            });
        }
    }
    imageStyles = {
        'aspect-ratio': '3/2',
        'object-fit': 'cover',
    };

    // ngOnDestroy(): void {
    //     this.subscriber$.unsubscribe();
    // }
}
