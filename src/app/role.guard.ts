import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      if(localStorage.getItem('role')=='Manager'){   
        return true;
      }
      this.router.navigate(['/home']);
      return false;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
