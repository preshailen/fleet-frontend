import { inject } from '@angular/core'
import { CanActivateChildFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { AlertService } from '../services/alert.service';


export const roleGuard: CanActivateChildFn = (route, state) => {
  const auth = inject(AuthService);
  const alert = inject(AlertService);
  const roles = route.data?.['roles'] as string[];

  if (!auth.hasAnyRole(roles)) {
    alert.error('Access is denied');
    return false;
  } else {
    return true;
  }
}

