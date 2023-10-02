import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenStorageService } from '../modules/auth/token-storage.service';

export const loggedGuard : CanActivateFn = (route, state) => {
  const tokenStorageService = inject(TokenStorageService);
  const rtr = inject(Router);
  if (tokenStorageService.isLoggedIn()){
    // console.log("correct USER is logged In, return"+as.isLoggedIn())
    return tokenStorageService.isLoggedIn();
  } 
  else {
    // console.log("Incorrect USER is NOT logged In, return"+as.isLoggedIn())
    rtr.navigateByUrl('/login');
    return false;
  }
  
}
