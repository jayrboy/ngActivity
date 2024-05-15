import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  let token = localStorage.getItem('token');

  if (token === null) {
    alert('Please login, redirecting to login page !!');
    _router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
