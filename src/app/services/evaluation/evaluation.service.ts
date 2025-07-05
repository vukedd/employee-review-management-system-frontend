import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEvaluationRequest } from '../../models/evaluation/CreateEvaluationRequest';
import { API_URL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  constructor(private http: HttpClient) { }

  public createEvaluation(evaluation: CreateEvaluationRequest) {
    return this.http.post(API_URL + "/evaluation/create", evaluation);
  }
}
