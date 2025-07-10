import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateEvaluationPeriodDto } from '../../models/evaluation-period/createEvaluatioPeriodDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluationCycleService {
  constructor(public http: HttpClient) {}

  public createEvaluationCycle(
    request: CreateEvaluationPeriodDto
  ): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/evaluationPeriod/create',
      request
    );
  }

  public getEvaluationCycleStatistics(
    teamId: number,
    cycleId: number
  ): Observable<any> {
    return this.http.get(environment.apiUrl + '/evaluationPeriod/statistics?teamId=' + teamId.toString() + "&cycleId=" + cycleId.toString());
  }

  public getCycleChoices(): Observable<any> {
    return this.http.get(environment.apiUrl + '/evaluationPeriod/choice');
  }
}
