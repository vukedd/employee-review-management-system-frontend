import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  constructor(public http: HttpClient, public authService: AuthService) { }

  public getMembershipsByUsername() : Observable<any> {
    let username = this.authService.getUsername();

    return this.http.get(environment.apiUrl + "/membership/" + username);
  }

  public getTeammatesByUsername() : Observable<any> {
    let username = this.authService.getUsername();
    
    return this.http.get(environment.apiUrl + "/membership/collegues/" + username);
  }
}
