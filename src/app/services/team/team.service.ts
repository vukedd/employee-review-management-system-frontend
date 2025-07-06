import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../globals';
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(public http: HttpClient) { }

  getTeamById(id: number) : Observable<any> {
    return this.http.get(API_URL + "/team/" + id.toString());
  }
}
