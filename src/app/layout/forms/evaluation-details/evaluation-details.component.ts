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
import { AuthService } from '../../../services/auth/auth.service';
import { ConcreteEvaluationService } from '../../../services/concrete-evaluation/concrete-evaluation.service';
import { ToastsPositionService } from '../../toasts/toasts.service';

@Component({
  selector: 'app-evaluation-details',
  imports: [    
    CommonModule,
    CardModule,
    RadioButtonModule,
    FormsModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
    RouterModule
  ],
  templateUrl: './evaluation-details.component.html',
  styleUrl: './evaluation-details.component.css'
})
export class EvaluationDetailsComponent {
  public responses: any[] = [];
  public reviewee: string = '';
  public evaluation: any = {type: 1}

  constructor(
    public route: ActivatedRoute,
    private concreteEvaluationService: ConcreteEvaluationService,
    private messageService: MessageService,
    private router: Router,
    public toastPositionService: ToastsPositionService,
    private authService: AuthService
  ) {
      concreteEvaluationService.getConcreteEvaluation(this.route.snapshot.params['id'])
      .subscribe({
        next: (next) => {
          this.evaluation = next;
          this.reviewee = next.reviewee.username;
          this.responses = next.responses;
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


}
