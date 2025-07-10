import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { loginRequestDto } from '../../models/auth/loginRequestDto';
import { token } from '../../models/auth/token';
import { registerRequestDto } from '../../models/auth/registerRequestDto';
import { RefreshTokenRequest } from '../../models/auth/refreshTokenRequest';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  sendLoginRequest(request: loginRequestDto): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/login', request);
  }

  sendRegisterRequest(request: registerRequestDto): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/register', request);
  }

  setTokens(token: token) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('accessToken', token.accessToken);
      localStorage.setItem('refreshToken', token.refreshToken);
    }
  }

  setAccessToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('accessToken', token);
    }
  }

  getRefreshToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  getUserRole() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = this.getAccessToken();
      let role: string | undefined = '';
      let decoded: any;

      if (token != null) {
        decoded = jwtDecode(token);
        role = decoded['role'];
      }

      return role;
    }

    return undefined;
  }

  isLoggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (
        localStorage.getItem('accessToken') != null &&
        localStorage.getItem('refreshToken') != null
      ) {
        return true;
      }
    }

    return false;
  }

  refreshToken(): Observable<any> {
    let refreshToken: any = '';
    if (typeof window !== 'undefined' && window.localStorage) {
      refreshToken = localStorage.getItem('refreshToken');
    } else {
      return EMPTY;
    }
    if (refreshToken == null) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }
    let body: RefreshTokenRequest = {
      token: refreshToken,
    };
    return this.http.post(environment.apiUrl + '/auth/refresh', body);
  }

  getAccessToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  logout() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      let token = localStorage.getItem('refreshToken');
      return this.http.post(environment.apiUrl + '/auth/logout', { token });
    }
    return null;
  }

  removeTokens(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    }
  }

  getUsername(): string | null | undefined {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = this.getAccessToken();
      let username: string | undefined = '';
      let decoded: any;

      if (token != null) {
        decoded = jwtDecode(token);
        username = decoded['unique_name'];
      }

      return username;
    }

    return null;
  }
}
