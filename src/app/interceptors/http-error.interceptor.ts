// http-error.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('the error', error);
                alert('helo');
                if (error.status === 403 || error.status === 401) {
                    alert('jovanie');
                    console.error(
                        'Unauthorized or Forbidden access. Redirecting to login page.'
                    );
                    // Redirect to the login page or perform other actions as needed
                }
                return throwError(error);
            })
        );
    }
}
