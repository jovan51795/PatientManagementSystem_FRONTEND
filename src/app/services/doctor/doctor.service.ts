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
    constructor(private http: HttpClient) {
        this.token = sessionStorage.getItem('pms-user');
    }
    token: any;

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

    delete(id: string) {
        return this.http
            .delete(`${env.PRIVATE_URL}/doctor/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((data: IResponse) => data));
    }

    update(doctor: IDoctor) {
        return this.http
            .patch(`${env.PRIVATE_URL}/doctor`, doctor, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            .pipe(tap((x: IResponse) => x));
    }
}
