import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private us: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if (this.us.user) {
                    this.router.navigateByUrl('/unauthorized');
                } else {
                    this.router.navigateByUrl(`/login?return=${this.router.url}`);
                }
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}