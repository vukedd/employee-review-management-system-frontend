import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule }from '@angular/router'
import { ConcreteEvaluationService } from '../../../services/concrete-evaluation/concrete-evaluation.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SubmitEvaluationDto } from '../../../models/evaluation/SubmitEvaluationDto';
import { ToastsPositionService } from '../../toasts/toasts.service';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-evaluate',
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
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.css'
})
export class EvaluateComponent {
  public responses: any[] = []
  public reviewee: any = "";
  public evaluation: any;

  constructor(
    public route: ActivatedRoute,
    private concreteEvaluationService: ConcreteEvaluationService,
    private messageService: MessageService,
    private router: Router,
    public toastPositionService: ToastsPositionService,
    private authService: AuthService
  ) {
    concreteEvaluationService.getConcreteEvaluation(this.route.snapshot.params["id"]).subscribe({
      next: (next) => {
        if (next.reviewer.username != this.authService.getUsername()) {
          this.router.navigate(['/dashboard']);
        }
        this.evaluation = next
        this.reviewee = next.reviewee
        this.responses = next.responses

        for (let i = 0; i < this.responses.length; i ++) {
          if(this.responses[i].type == 0) {
            this.responses[i].content = 5
          }
        }

      }, error: (error) => {
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity: "error",
          detail: "Evaluation not found!",
          summary: "Not found"
        })
      }
    })
  }

  submitForm() {
    for (let i = 0; i < this.evaluation.responses.length; i ++) {
      let response: string = this.evaluation.responses[i].content;
      if (this.evaluation.responses[i].type != 0 && response.trim() == "") {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid evaluation answer',
          detail: 'Please check all fields before submitting.'
        });
        return
      }
    }

    for (let i = 0; i < this.evaluation.responses.length; i ++) {
      if (this.evaluation.responses[i].type == 0) {
        this.evaluation.responses[i].content = this.evaluation.responses[i].content.toString();
        continue;
      }

      this.evaluation.responses[i].content = this.evaluation.responses[i].content.trim();
    }
    
    this.concreteEvaluationService.submitEvaluation(this.evaluation).subscribe({
      next: (next) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Evaluation successfully submitted!',
          summary: 'Evaluation success'
        })
        this.router.navigate(['/dashboard'])
      }, error: (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Please, try again later!',
          summary: 'An unexpected error occurred'
        })
      }
    })
  }
}
