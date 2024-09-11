// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('user') == null) {
        this.router.navigate(['/landing']);
        return false;
      }
      return true;
    }
    return true;
  }
}
