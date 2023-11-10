import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'patients',
                            loadChildren: () =>
                                import(
                                    './demo/components/patients/patients.module'
                                ).then((m) => m.PatientsModule),
                        },
                        {
                            path: 'patient/add',
                            loadChildren: () =>
                                import(
                                    './demo/components/patients-form/patients-form.module'
                                ).then((m) => m.PatientsFormModule),
                        },
                        {
                            path: 'patient/add/:id',
                            loadChildren: () =>
                                import(
                                    './demo/components/patients-form/patients-form.module'
                                ).then((m) => m.PatientsFormModule),
                        },
                        {
                            path: 'patient/details/:id',
                            loadChildren: () =>
                                import(
                                    './demo/components/patients-details/patient.module'
                                ).then((m) => m.PatientModule),
                        },
                        {
                            path: 'patient/history/:id',
                            loadChildren: () =>
                                import(
                                    './demo/components/patients-history/patients-history.module'
                                ).then((m) => m.PatientsHistoryModule),
                        },
                        {
                            path: 'patient/record/:id',
                            loadChildren: () =>
                                import(
                                    './demo/components/record-form/record.module'
                                ).then((m) => m.RecordModule),
                        },
                        {
                            path: 'doctors',
                            loadChildren: () =>
                                import(
                                    './demo/components/doctors/doctors.module'
                                ).then((m) => m.DoctorsModule),
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UIkitModule),
                        },
                        {
                            path: 'utilities',
                            loadChildren: () =>
                                import(
                                    './demo/components/utilities/utilities.module'
                                ).then((m) => m.UtilitiesModule),
                        },
                        {
                            path: 'documentation',
                            loadChildren: () =>
                                import(
                                    './demo/components/documentation/documentation.module'
                                ).then((m) => m.DocumentationModule),
                        },
                        {
                            path: 'blocks',
                            loadChildren: () =>
                                import(
                                    './demo/components/primeblocks/primeblocks.module'
                                ).then((m) => m.PrimeBlocksModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: 'landing',
                    loadChildren: () =>
                        import('./demo/components/landing/landing.module').then(
                            (m) => m.LandingModule
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
