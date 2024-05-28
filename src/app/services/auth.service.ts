import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Login from '../models/account.model';
import Response from '../models/response.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );
  token$ = this.tokenSubject.asObservable();

  roleSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('role')
  );
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/api/Account/Login';

  logIn(account: Login) {
    return this.http.post<Response>(`${this.baseURL}`, account); // Tested
  }

  setToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.tokenSubject.next(token);
    this.roleSubject.next(role);
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
  }
}
