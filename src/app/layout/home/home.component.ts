import { Component } from '@angular/core';
import { EmployeeDashboardComponent } from "../dashboards/employee-dashboard/employee-dashboard.component";
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
    SelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public username: string | null | undefined = "User";
  public pendingEvaluationCount: any = 0;
  public feedback: any;
  public feedbackDate: string | null | undefined;
  public visible: boolean = false;
  public teammates: any[] | any;
  public selectedTeammate: string | undefined;

  constructor(
    private authService: AuthService,
    private concreteEvaluationService: ConcreteEvaluationService,
    private feedbackService: FeedbackService,
  ) {
    this.username = authService.getUsername() ?? "User";
    
    concreteEvaluationService.getPendingEvaluationCountByUsername().subscribe({
      next: (next) => {
        this.pendingEvaluationCount = next;
      }, error: (error) => {}
    });

    feedbackService.getLatestFeedback().subscribe({
      next: (next) => {
        this.feedback = next;
        let submissionDate: string | undefined | null = this.feedback.submissionTimestamp;
        this.feedbackDate = submissionDate?.split("T")[0];
      }, error: (error) => {}
    })
  }
}
