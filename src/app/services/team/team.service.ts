import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TeamCommandRequestDto } from '../../models/team/teamCommandRequestDto';


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

  createTeam(teamRequest: TeamCommandRequestDto) : Observable<any> {
    return this.http.post(environment.apiUrl + "/team/create", teamRequest);
  }

  editTeam(teamId: any, teamRequest: TeamCommandRequestDto) : Observable<any> {
    console.log(teamRequest);
    return this.http.put(environment.apiUrl + "/team/" + teamId, teamRequest);
  }

  getAllTeams(): Observable<any> {
    return this.http.get(environment.apiUrl + "/team");
  }
}
