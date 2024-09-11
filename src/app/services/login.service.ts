import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "http://localhost:8083/api/user";
  currentUser: any = null;
  private user_role:any=null;

  private user=new BehaviorSubject<any>(null);
  user$=this.user.asObservable();

  private authenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.authenticated.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocal();
  }

  login(user_name: string, password: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/login/${user_name}/${password}`));
  }

  setData(user: any): void {
    this.currentUser = user;
    this.user_role=user.role;
    this.authenticated.next(true);
    this.saveUserToLocal();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    this.authenticated.next(false);
    this.removeUserFromLocal();
    this.router.navigate(["/login"]);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  private saveUserToLocal(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      localStorage.setItem('role',this.user_role);
    }
  }

  private loadUserFromLocal(): void {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        this.user.next(JSON.parse(user));
        this.currentUser = JSON.parse(user);
        this.user_role=this.currentUser.role;
        this.authenticated.next(true);
      }
    }
  }

  private removeUserFromLocal(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('user');
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'localStorageTest';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }


}
