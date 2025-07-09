import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CreateTeamRequestDto } from '../../models/team/createTeamRequestDto';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(public http: HttpClient) { }

  getTeamById(id: number) : Observable<any> {
    return this.http.get(environment.apiUrl + "/team/" + id.toString());
  }
  
  getTeamHieararchy(teamId: number) : Observable<any> {
    return this.http.get(environment.apiUrl + "/team/hierarchy/" + teamId.toString());
  }

  createTeam(teamRequest: CreateTeamRequestDto) : Observable<any> {
    return this.http.post(environment.apiUrl + "/team/create", teamRequest);
  }
}
