import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FeedbackDto } from '../../models/feedback/feedbackDto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getLatestFeedback() {
    let username: string | undefined | null = this.authService.getUsername();
    return this.http.get(environment.apiUrl + "/feedback/latest/" + username);
  }

  public getFeedbackList() {
    let username: string | undefined | null = this.authService.getUsername()
    return this.http.get(environment.apiUrl + "/feedback/" + username);
  }

  public createFeedback(feedback: FeedbackDto) {
    return this.http.post(environment.apiUrl + "/feedback/create", feedback);
  }
}
