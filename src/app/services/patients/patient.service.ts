import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../env';
import { IPatient, IPatientRecord } from 'src/app/interfaces/patient';
import { IResponse } from 'src/app/interfaces/response';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private http: HttpClient) {
        this.token = sessionStorage.getItem('pms-user');
    }
    token: any;

    // save(data: IPatient) {
    //     return this.http
    //         .post(`${env.PRIVATE_URL}/patient`, data, {
    //             headers: {
    //                 Authorization: `Bearer ${this.token}`,
    //             },
    //         })
    //         .pipe(tap((x: IResponse) => x));
    // }

    save(data: IPatient, files: FormData) {
        return this.http
            .post(
                `${env.PRIVATE_URL}/patient?patient=${encodeURIComponent(
                    JSON.stringify(data)
                )}`,
                files,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            )
            .pipe(tap((x: IResponse) => x));
    }

    saveWithoutFile(data: IPatient) {
        return this.http
            .post(`${env.PRIVATE_URL}/patient/no-file`, data, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }
    delete(id: string) {
        return this.http
            .delete(`${env.PRIVATE_URL}/patient/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }

    update(patient: IPatient, files: FormData) {
        return this.http
            .patch(
                `${env.PRIVATE_URL}/patient?patient=${encodeURIComponent(
                    JSON.stringify(patient)
                )}`,
                files,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            )
            .pipe(tap((x: IResponse) => x));
    }

    updateWithoutFile(patient: IPatient) {
        return this.http
            .patch(`${env.PRIVATE_URL}/patient/no-file`, patient, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }

    getAllPatients() {
        return this.http
            .get(`${env.PRIVATE_URL}/patient`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }

    getDetails(id: string) {
        return this.http
            .get(`${env.PRIVATE_URL}/patient/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }

    addPatientRecord(id: string, record: IPatientRecord) {
        return this.http
            .patch(`${env.PRIVATE_URL}/record/${id}`, record, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }

    addPatientRecordWithfile(
        id: string,
        record: IPatientRecord,
        file: FormData
    ) {
        return this.http
            .patch(
                `${env.PRIVATE_URL}/record?id=${id}&record=${encodeURIComponent(
                    JSON.stringify(record)
                )}`,
                file,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            )
            .pipe(tap((x: IResponse) => x));
    }
}
