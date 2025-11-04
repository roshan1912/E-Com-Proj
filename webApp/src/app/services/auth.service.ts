import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor() {}

  register(model: any) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name: model.name,
      email: model.email,
      password: model.password,
    });
  }

  login(model: any) {
    return this.http.post(environment.apiUrl + '/auth/login', {
      email: model.email,
      password: model.password,
    });
  }

  setLoginState(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this._isLoggedIn.next(true);
  }

  // Utility: check if token exists
  private hasToken(): boolean {
    if (typeof window === 'undefined' || !window?.localStorage) return false;
    return !!window.localStorage.getItem('token');
  }

  get isLoggedIn() {
    return this._isLoggedIn.value;
  }

  get isAdmin() {
    if (typeof window === 'undefined' || !window?.localStorage) return null;
    const userData = window.localStorage.getItem('user');
    if (!userData) return null;
    try {
      return JSON.parse(userData).isAdmin ?? null;
    } catch {
      return false;
    }
  }

  get userName() {
    if (typeof window === 'undefined' || !window?.localStorage) return null;
    const userData = window.localStorage.getItem('user');
    if (!userData) return null;
    try {
      return JSON.parse(userData).name ?? null;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isLoggedIn.next(false); // notify subscribers
  }
}
