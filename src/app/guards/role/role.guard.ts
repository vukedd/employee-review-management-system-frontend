import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const currentRole = authService.getUserRole();

  if (currentRole !== expectedRole) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
