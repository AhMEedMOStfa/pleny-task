import { CanActivateFn, Router } from '@angular/router';
import { AUTH_TOKEN } from '../constants/token';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
