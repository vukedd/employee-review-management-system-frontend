import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { SubmitEvaluationDto } from '../../models/evaluation/SubmitEvaluationDto';
import { environment } from '../../../environments/environment.development';

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
    return this.http.get(environment.apiUrl + "/concreteEvaluation?username=" + username + '&filter=' + filter.toString() + "&teamId=" + teamId);
  }

  getConcreteEvaluation(id: number) : Observable<any> {
    return this.http.get(environment.apiUrl + '/concreteEvaluation/' + id.toString());
  }

  submitEvaluation(evaluation: SubmitEvaluationDto) : Observable<any> {
    return this.http.put(environment.apiUrl + "/concreteEvaluation/submit", evaluation);
  }

  getPendingEvaluationCountByUsername() {
    let username: string | undefined | null = this.authService.getUsername()
    return this.http.get(environment.apiUrl + "/concreteEvaluation/count/" + username);
  }

  getPeerEvaluationsByTeamId(teamId: number) {
    return this.http.get(environment.apiUrl + "/concreteEvaluation/peer/" + teamId.toString());
  }
}
