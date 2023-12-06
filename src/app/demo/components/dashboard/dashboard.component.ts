import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PatientService } from 'src/app/services/patients/patient.service';
import { IStatusReport } from 'src/app/interfaces/patient';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    patientStatusReport: IStatusReport[] = [];

    monthOrder = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
    };

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private patientService: PatientService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.getPatientStatusReport();
        });
    }

    ngOnInit() {
        this.getPatientStatusReport();

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
    }

    getPatientStatusReport() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
        this.patientService.getPatientStatusReport().subscribe((x) => {
            if (x.status === 1) {
                console.log(x.data);
                x.data?.chartData?.labels.sort(
                    (a, b) => this.monthOrder[a] - this.monthOrder[b]
                );
                this.patientStatusReport = x.data.status;
                x.data.chartData.datasets.map((m) => {
                    m.backgroundColor = eval(m.backgroundColor);
                    m.borderColor = eval(m.borderColor);
                });
                setTimeout(() => {
                    this.chartData = x.data.chartData;
                }, 100);
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getUserDetails() {
        this.authService.getUserDetails().subscribe((data) => {
            console.log(data);
        });
    }
}
