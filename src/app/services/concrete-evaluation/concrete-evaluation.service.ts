import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { API_URL } from '../../../globals';
import { Observable } from 'rxjs';
import { SubmitEvaluationDto } from '../../models/evaluation/SubmitEvaluationDto';

@Injectable({
  providedIn: 'root'
})
export class ConcreteEvaluationService {
  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  getConcreteEvaluations(filter: number, teamId: number) : Observable<any> {
    let username: string | undefined | null = this.authService.getUsername()
    return this.http.get(API_URL + "/concreteEvaluation?username=" + username + '&filter=' + filter.toString() + "&teamId=" + teamId);
  }

  getConcreteEvaluation(id: number) : Observable<any> {
    return this.http.get(API_URL + '/concreteEvaluation/' + id.toString());
  }

  submitEvaluation(evaluation: SubmitEvaluationDto) : Observable<any> {
    return this.http.put(API_URL + "/concreteEvaluation/submit", evaluation);
  }

  getPendingEvaluationCountByUsername() {
    let username: string | undefined | null = this.authService.getUsername()
    return this.http.get(API_URL + "/concreteEvaluation/count/" + username);
  }

  getPeerEvaluationsByTeamId(teamId: number) {
    return this.http.get(API_URL + "/concreteEvaluation/peer/" + teamId.toString());
  }
}
