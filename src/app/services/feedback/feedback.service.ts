import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { API_URL } from '../../../globals';
import { FeedbackDto } from '../../models/feedback/feedbackDto';

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
    return this.http.get(API_URL + "/feedback/latest/" + username);
  }

  public getFeedbackList() {
    let username: string | undefined | null = this.authService.getUsername()
    return this.http.get(API_URL + "/feedback/" + username);
  }

  public createFeedback(feedback: FeedbackDto) {
    return this.http.post(API_URL + "/feedback/create", feedback);
  }
}
