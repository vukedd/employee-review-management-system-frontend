import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../globals';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequestDto } from '../../models/auth/loginRequestDto';
import { Token } from '../../models/auth/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) { }

  sendLoginRequest(request: LoginRequestDto) : Observable<any> {
    return this.http.post(API_URL + "/auth/login", request);
  }

  setTokens(token: Token) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
      this.loggedInSubject.next(true);
    }
  }

  isLoggedIn(){
    return this.loggedInSubject.value === true;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      this.loggedInSubject.next(false);
    }
  }
}
