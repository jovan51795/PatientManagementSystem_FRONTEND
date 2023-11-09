import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, User } from 'src/app/interfaces/user';
import { env } from '../env';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${env.BASE_URL}/authenticate`, user)
    .pipe(
        tap((data: Token) =>data)
    )
  }

  register(user: User) {
    return this.http.post(`${env.BASE_URL}/register`, user).pipe(
        tap((data: Token) => data )
    )
  }

  getUserDetails() {
    const token = sessionStorage.getItem("pms-user")
    return this.http.get(`${env.PRIVATE_URL}/details`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).pipe(
        tap((data: any) => data)
    )
  }
}
