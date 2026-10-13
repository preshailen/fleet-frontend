import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(RouteService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.goToLogin();
    return false;
  }
}