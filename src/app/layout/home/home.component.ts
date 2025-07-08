import { Component } from '@angular/core';
import { EmployeeDashboardComponent } from '../dashboards/employee-dashboard/employee-dashboard.component';
import { AuthService } from '../../services/auth/auth.service';
import { ConcreteEvaluationService } from '../../services/concrete-evaluation/concrete-evaluation.service';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MembershipService } from '../../services/membership/membership.service';
import { TextareaModule } from 'primeng/textarea';
import { FeedbackDto } from '../../models/feedback/feedbackDto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  imports: [
    EmployeeDashboardComponent,
    DividerModule,
    CardModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    DialogModule,
    SelectModule,
    FormsModule,
    TextareaModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public username: string | null | undefined = 'User';
  public pendingEvaluationCount: any = 0;
  public feedback: any;
  public feedbackDate: string | null | undefined;
  public visible: boolean = false;
  public teammates: any[] | any;
  public selectedTeammate: string | undefined;
  public feedbackInput: string | undefined;
  public privacyOptions: any[] = [
    { privacy: 'Private', value: 0 },
    { privacy: 'Public', value: 1 },
  ];
  public selectedPrivacyOption: any = this.privacyOptions[0];

  constructor(
    private authService: AuthService,
    private concreteEvaluationService: ConcreteEvaluationService,
    private feedbackService: FeedbackService,
    private membershipService: MembershipService,
    private messageService: MessageService
  ) {
    this.username = authService.getUsername() ?? 'User';

    concreteEvaluationService.getPendingEvaluationCountByUsername().subscribe({
      next: (next) => {
        this.pendingEvaluationCount = next;
      },
      error: (error) => {},
    });

    feedbackService.getLatestFeedback().subscribe({
      next: (next) => {
        this.feedback = next;
        let submissionDate: string | undefined | null =
          this.feedback.submissionTimestamp;
        this.feedbackDate = submissionDate?.split('T')[0];
      },
      error: (error) => {
        this.feedback = undefined;
      },
    });

    this.membershipService.getTeammatesByUsername().subscribe({
      next: (next) => {
        this.teammates = next;
      },
    });
  }

  initFeedbackModal() {
    this.visible = true;
  }

  submitFeedback() {
    let feedback: FeedbackDto = {
      reviewee: this.selectedTeammate,
      reviewer: this.authService.getUsername(),
      content: this.feedbackInput,
      visibility: this.selectedPrivacyOption.value,
    };

    console.log(feedback);

    if (feedback.content == undefined || feedback.reviewee == undefined) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please check all field before submitting!',
        summary: 'Action failure!',
      });
      return;
    }

    if (feedback.content.trim() == "") {
      this.messageService.add({
        severity: 'error',
        detail: 'Please check all field before submitting!',
        summary: 'Action failure!',
      });
      return;
    }

    this.feedbackService.createFeedback(feedback).subscribe({
      next: (next) => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          detail: 'Evaluation submitted sucessfully!',
          summary: 'Action success!',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'An error occurred while submitting the feedback!',
          summary: 'Action failure!',
        });
      },
    });
  }

  getRole() {
    return this.authService.getUserRole();
  }
}
