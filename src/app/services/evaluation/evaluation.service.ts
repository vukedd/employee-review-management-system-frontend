import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEvaluationRequest } from '../../models/evaluation/CreateEvaluationRequest';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  constructor(private http: HttpClient) { }

  public createEvaluation(evaluation: CreateEvaluationRequest) {
    return this.http.post(environment.apiUrl + "/evaluation/create", evaluation);
  }
}
