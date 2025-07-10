import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ConcreteEvaluationService } from '../../../services/concrete-evaluation/concrete-evaluation.service';
import { ToastsPositionService } from '../../toasts/toasts.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-edit-evaluation',
  imports: [
    CommonModule,
    CardModule,
    RadioButtonModule,
    FormsModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
    RouterModule,
  ],
  templateUrl: './edit-evaluation.component.html',
  styleUrl: './edit-evaluation.component.css',
})
export class EditEvaluationComponent {
  public responses: any[] = [];
  public reviewee: string = '';
  public evaluation: any;

  constructor(
    public route: ActivatedRoute,
    private concreteEvaluationService: ConcreteEvaluationService,
    private messageService: MessageService,
    private router: Router,
    public toastPositionService: ToastsPositionService,
    private authService: AuthService
  ) {
    concreteEvaluationService
      .getConcreteEvaluation(this.route.snapshot.params['id'])
      .subscribe({
        next: (next) => {
          if (next.evaluationType == 0) {
            this.router.navigate(['/dashboard']);
          }

          if (next.reviewer.username != this.authService.getUsername()) {
            this.router.navigate(['/dashboard']);
          }

          if(new Date(next.deadline) < new Date()) {
            this.router.navigate(['/dashboard']);
          }

          this.evaluation = next;
          this.reviewee = next.reviewee.username;
          this.responses = next.responses;

          for (let i = 0; i < this.responses.length; i++) {
            if (this.responses[i].type == 0) {
              this.responses[i].content = Number(this.responses[i].content);
            }
          }
        },
        error: (error) => {
          this.router.navigate(['/dashboard']);
          this.messageService.add({
            severity: 'error',
            detail: 'Evaluation not found!',
            summary: 'Not found',
          });
        },
      });
  }

  submitForm() {
    for (let i = 0; i < this.evaluation.responses.length; i++) {
      let response: string = this.evaluation.responses[i].content;
      if (this.evaluation.responses[i].type != 0 && response.trim() == '') {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid evaluation answer',
          detail: 'Please check all fields before submitting.',
        });
        return;
      }
    }

    for (let i = 0; i < this.evaluation.responses.length; i++) {
      if (this.evaluation.responses[i].type == 0) {
        this.evaluation.responses[i].content =
          this.evaluation.responses[i].content.toString();
        continue;
      }

      this.evaluation.responses[i].content =
        this.evaluation.responses[i].content.trim();
    }

    this.concreteEvaluationService.submitEvaluation(this.evaluation).subscribe({
      next: (next) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Evaluation successfully submitted!',
          summary: 'Evaluation success',
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Please, try again later!',
          summary: 'An unexpected error occurred',
        });
      },
    });
  }
}
