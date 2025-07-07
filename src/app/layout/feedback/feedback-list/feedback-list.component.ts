import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FeedbackService } from '../../../services/feedback/feedback.service';

@Component({
  selector: 'app-feedback-list',
  imports: [
    CardModule,
    CommonModule,
  ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {
  public feedbackList: any | any[];

  constructor(
    public feedbackService: FeedbackService
  ) {
    feedbackService.getFeedbackList().subscribe({
      next: (next) => {
        this.feedbackList = next;
        for (let i = 0; i < this.feedbackList.length; i ++) {
          this.feedbackList[i].submissionTimestamp = this.feedbackList[i].submissionTimestamp.split("T")[0];
        }
      }
    })
  }
}
