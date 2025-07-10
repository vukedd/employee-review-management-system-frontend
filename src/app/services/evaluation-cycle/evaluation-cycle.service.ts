import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateEvaluationPeriodDto } from '../../models/evaluation-period/createEvaluatioPeriodDto';

@Injectable({
  providedIn: 'root'
})
export class EvaluationCycleService {
  constructor(public http: HttpClient) { }

  public createEvaluationCycle(request: CreateEvaluationPeriodDto) {
    return this.http.post(environment.apiUrl + "/evaluationPeriod/create", request);
  }
}
