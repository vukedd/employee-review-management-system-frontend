import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../globals';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  constructor(public http: HttpClient, public authService: AuthService) { }

  public getMembershipsByUsername() : Observable<any> {
    let username = this.authService.getUsername();

    return this.http.get(API_URL + "/membership/" + username);
  }

  public getTeammatesByUsername() : Observable<any> {
    let username = this.authService.getUsername();
    
    return this.http.get(API_URL + "/membership/collegues/" + username);
  }
}
