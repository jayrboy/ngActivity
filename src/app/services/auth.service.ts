import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Login from '../models/login.model';
import Response from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/api/Login';

  login(account: Login) {
    return this.http.post<Response>(`${this.baseURL}`, account);
  }
}
