import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }): req;
  return next(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !req.url.includes('/auth/refresh') && !req.url.includes('/auth/login')) {
          if (!isRefreshing) {
            isRefreshing = true;
            refreshTokenSubject.next(null);
            return authService.refreshToken().pipe(switchMap((res) => {
              isRefreshing = false;
              authService.setAccessToken(res.accessToken);
              refreshTokenSubject.next(res.accessToken);
              const cloned = authReq.clone({ setHeaders: { Authorization: `Bearer ${res.accessToken}` } });
                return next(cloned);
            }),
            catchError(err => {
              isRefreshing = false;
              authService.logout();
              refreshTokenSubject.next(null);
              return throwError(() => err);
            }));
          }
          return refreshTokenSubject.pipe(filter(token => token !== null), take(1), switchMap(token => {
            const cloned = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
            return next(cloned);
          }));
        }
        return throwError(() => err);
      })
    );
}      
