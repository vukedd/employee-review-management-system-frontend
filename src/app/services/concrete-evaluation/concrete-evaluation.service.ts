import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';
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
    const token = this.authService.getAccessToken();
    let username: string | undefined = "";
    let decoded: any;

    if (token != null) { 
      decoded = jwtDecode(token);
      username = decoded["unique_name"];
    }

    return this.http.get(API_URL + "/concreteEvaluation?username=" + username + '&filter=' + filter.toString() + "&teamId=" + teamId);
  }

  getConcreteEvaluation(id: number) : Observable<any> {
    return this.http.get(API_URL + '/concreteEvaluation/' + id.toString());
  }

  submitEvaluation(evaluation: SubmitEvaluationDto) : Observable<any> {
    return this.http.put(API_URL + "/concreteEvaluation/submit", evaluation);
  }
}
