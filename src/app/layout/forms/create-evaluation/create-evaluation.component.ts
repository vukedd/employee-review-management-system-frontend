import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { SelectModule } from 'primeng/select';
import { EvaluationType } from '../../../enums/evaluation/evaluationType';
import { FormsModule } from '@angular/forms';
import { QuestionCategory } from '../../../enums/question/questionCategory';
import { QuestionType } from '../../../enums/question/questionType';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { EvaluationDto } from '../../../models/evaluation/EvaluationDto';
import { MessageService } from 'primeng/api';
import { CreateEvaluationRequest } from '../../../models/evaluation/CreateEvaluationRequest';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-evaluation',
  imports: [
    StepperModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    CardModule,
    CommonModule,
    TextareaModule
  ],
  templateUrl: './create-evaluation.component.html',
  styleUrl: './create-evaluation.component.css'
})
export class CreateEvaluationComponent {
  public evalTypes: EvaluationType[] = [EvaluationType.LEAD, EvaluationType.PEER, EvaluationType.SELF]
  public questionCategories: QuestionCategory[] = [QuestionCategory.COMMUNICATION, QuestionCategory.INITIATIVE, QuestionCategory.PROFESSIONALISM, QuestionCategory.TEAMWORK, QuestionCategory.TECHNICAL_SKILLS]
  public questionTypes: QuestionType[] = [QuestionType.SCALAR, QuestionType.TEXT]
  public selectedEvalType: string = "";

  private evalMap: Map<string, number> = new Map([
    ["SELF", 0],
    ["PEER", 1],
    ["LEAD", 2]
  ]);

  private qTypeMap: Map<string, number> = new Map([
    ["Scalar", 0],
    ["Text", 1],
  ]);

  private qCategoryMap: Map<string, number> = new Map([
    ["Teamwork", 0],
    ["Initiative", 1],
    ["Professionalism", 2],
    ["Communication", 3],
    ["Technical skill", 4]
  ]);


  public evaluation: EvaluationDto = {
    type: 0,
    questions: [{
      content: "",
      type: QuestionType.TEXT,
      category: QuestionCategory.TECHNICAL_SKILLS
    }]
  }

  constructor(
    private messageService: MessageService,
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  assignEvaluationType(): void {
    this.evaluation.type = this.evalMap.get(this.selectedEvalType);
  }

  addQuestion(): void {
    this.evaluation.questions.push({
      type: QuestionType.TEXT,
      category: QuestionCategory.TECHNICAL_SKILLS, 
      content: ''
    });
  }

  removeQuestion(index: number): void {
    if (this.evaluation.questions.length > 1) {
      this.evaluation.questions.splice(index, 1);
    }
  }

  sendError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Evaluation not completed!',
      detail: 'Please check all fields before submitting!'
    });
  }

  submitEvaluation() {
    let evaluationRequest : CreateEvaluationRequest | undefined = {
      type: this.evaluation.type,
      questions: []
    } 

    if (this.evaluation.type === undefined) {
      this.sendError();
      return
    }


    this.evaluation.questions.forEach((question) => {
      if (question.content.trim() == '') {
        this.sendError();
        evaluationRequest = undefined;
        return
      }
      

      evaluationRequest?.questions.push({
        type: this.qTypeMap.get(question.type),
        category: this.qCategoryMap.get(question.category),
        content: question.content
      });
    })

    this.evaluationService.createEvaluation(evaluationRequest).subscribe({
      next: (next) => {
        this.router.navigate(['dashboard']);
        this.messageService.add({
          severity: 'success',
          summary: 'Action success!',
          detail: 'You have successfully created a new evaluation!'
        })
      }, error: (error) => {
        let errorMessage = "";

        switch (error.status) {
          case 403:
            errorMessage = "You don't have the permission to do this!";
            break;
          default:
            errorMessage = "An unexpected error has occurred! Please try again later!"
        }

        this.messageService.add({
          severity: 'error',
          summary: 'An error occured while creating a new evaluation!',
          detail: errorMessage
        })
      }
    })
  }
}
