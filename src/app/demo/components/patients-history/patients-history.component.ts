import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patients/patient.service';

@Component({
    selector: 'app-patients-history',
    templateUrl: './patients-history.component.html',
    styleUrls: ['./patients-history.component.scss'],
})
export class PatientsHistoryComponent implements OnInit {
    patient: IPatient = undefined;
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
            } else {
                this.router.navigate(['/patients']);
            }
        });
    }
}
