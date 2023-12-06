import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patients/patient.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-patients-history',
    templateUrl: './patients-history.component.html',
    styleUrls: ['./patients-history.component.scss'],
})
export class PatientsHistoryComponent implements OnInit {
    patient: IPatient = undefined;
    files: any;
    loaded: boolean = false;

    imageStyles = {
        'aspect-ratio': '3/2',
        'object-fit': 'cover',
    };
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private patientService: PatientService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((x) => {
            this.getDetails(x.get('id'));
        });
    }

    getDetails(id: string) {
        this.patientService.getDetails(id).subscribe((data) => {
            if (data.status === 1) {
                this.patient = data.data;
                this.convertToObjectUrl(data.data.patientRecords);
                this.loaded = true;
            } else {
                this.router.navigate(['/patients']);
            }
        });

        setTimeout(() => {
            console.log(this.patient);
        }, 5000);
    }

    convertToObjectUrl(patientRecords: any) {
        if (patientRecords.length) {
            patientRecords.forEach((record) => {
                if (record.file && record.file.length) {
                    record.file.forEach((file) => {
                        let objectURL = 'data:image/png;base64,' + file.file;
                        file.file =
                            this.sanitizer.bypassSecurityTrustUrl(objectURL); //URL.createObjectURL(blob);
                    });
                }
            });
        }
    }
}
