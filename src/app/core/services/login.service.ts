import { inject, Injectable, signal } from '@angular/core';
import { AuthPayload, AuthResponse } from '../models/auth-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_TOKEN } from '../constants/token';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);
  private readonly loginUrl = 'https://dummyjson.com/auth/login';
  authToken = signal<string | null>(null);
  constructor() {
    this.authToken.set(localStorage.getItem(AUTH_TOKEN));
  }
  login(payload: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, payload);
  }
}
