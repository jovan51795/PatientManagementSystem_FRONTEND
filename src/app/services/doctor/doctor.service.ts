import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctor } from 'src/app/interfaces/docker';
import { env } from '../env';
import { tap } from 'rxjs';
import { IResponse } from 'src/app/interfaces/response';

@Injectable({
    providedIn: 'root',
})
export class DoctorService {
    constructor(private http: HttpClient) {}
    token = sessionStorage.getItem('pms-user');

    save(doctor: IDoctor) {
        return this.http
            .post(`${env.PRIVATE_URL}/doctor`, doctor, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }

    getAllDoctors() {
        return this.http
            .get(`${env.PRIVATE_URL}/doctor`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }
}
