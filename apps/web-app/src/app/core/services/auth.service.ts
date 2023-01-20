import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface LoginResponse {
  accessToken: string;
  accessTokenExpires: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly ACCESS_TOKEN_KEY = 'accessToken';
  readonly ACCESS_TOKEN_EXPIRES_KEY = 'accessTokenExpires';

  constructor(private readonly httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    const expiryDate = new Date(
      Number(localStorage.getItem(this.ACCESS_TOKEN_EXPIRES_KEY))
    );
    return (
      localStorage.getItem(this.ACCESS_TOKEN_KEY) !== null &&
      new Date().getTime() < expiryDate.getTime()
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  signIn(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/auth/sign-in`, {
        email,
        password,
      })
      .pipe(
        tap((tokens) => {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
          localStorage.setItem(
            this.ACCESS_TOKEN_EXPIRES_KEY,
            String(tokens.accessTokenExpires)
          );
        })
      );
  }

  signOut(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_EXPIRES_KEY);
  }
}
