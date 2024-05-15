import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Login from '../models/login.model';
import Response from '../models/response';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/api/Login';

  logIn(account: Login) {
    return this.http.post<Response>(`${this.baseURL}`, account); // Tested
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
