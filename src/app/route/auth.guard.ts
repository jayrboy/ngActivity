import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const _toast = inject(ToastrService);
  const _router = inject(Router);
  let token = localStorage.getItem('token');

  if (token === null) {
    // alert('Please login, redirecting to login page !!');
    _router.navigate(['/']).then(() => {
      _router.navigate(['/login']);
      _toast.warning('Please login, redirecting to login page !!');
    });
    return false;
  } else {
    return true;
  }
};
