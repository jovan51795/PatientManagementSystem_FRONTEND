import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../env';
import { IPatient } from 'src/app/interfaces/patient';
import { IResponse } from 'src/app/interfaces/response';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private http: HttpClient) {}
    token = sessionStorage.getItem('pms-user');

    save(data: IPatient) {
        return this.http
            .post(`${env.PRIVATE_URL}/patient`, data, {
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

    update(patient: IPatient) {
        return this.http
            .patch(`${env.PRIVATE_URL}/patient`, patient, {
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
}
