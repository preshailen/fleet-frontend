import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }
  alertService.error('Not logged in!');
  router.navigate(['/auth/login']);
  return false;
}