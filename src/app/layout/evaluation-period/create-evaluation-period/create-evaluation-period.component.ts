import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { CalendarModule } from 'primeng/calendar';
import { DatePicker } from 'primeng/datepicker';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ToastsPositionService } from '../../toasts/toasts.service';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { EvaluationCycleService } from '../../../services/evaluation-cycle/evaluation-cycle.service';
import { CreateEvaluationPeriodDto } from '../../../models/evaluation-period/createEvaluatioPeriodDto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-evaluation-period',
  imports: [
    StepperModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    CardModule,
    CommonModule,
    TextareaModule,
    InputTextModule,
    CalendarModule,
    DatePicker,
    MultiSelectModule,
    ToastModule,
    ChipModule,
    DividerModule,
  ],
  templateUrl: './create-evaluation-period.component.html',
  styleUrl: './create-evaluation-period.component.css',
})
export class CreateEvaluationPeriodComponent {
  public cycleName: string = '';
  public cycleDescription: string = '';
  public startDate: any = new Date();
  public endDate: any = new Date();
  public selectedEvaluations: any[] = [];
  public evalutions: any = [];
  public minStartDate: Date | null = null;
  public minEndDate: Date | null = null;
  public evaluationPeriodCycle: CreateEvaluationPeriodComponent | undefined;
  public loading: boolean = false;

  constructor(
    public evaluationService: EvaluationService,
    public messageService: MessageService,
    public toastService: ToastsPositionService,
    public evaluationCycleService: EvaluationCycleService,
    public router: Router
  ) {
    // min start/end date handling
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    const tomtomorrow = new Date();
    tomtomorrow.setDate(tomorrow.getDate() + 1);

    this.minStartDate = new Date(tomorrow);
    this.minEndDate = new Date(tomtomorrow);

    this.startDate = new Date(this.minStartDate);
    this.endDate = new Date(this.minEndDate);

    evaluationService.getEvaluationChoices().subscribe({
      next: (next) => {
        this.evalutions = next;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Action failure',
          detail: 'An error occurred while fetching data!',
        });
      },
    });
  }

  validStep1() {
    if (this.cycleName.trim() != '') {
      return true;
    }

    return false;
  }

  validStep2() {
    if (this.selectedEvaluations.length > 0) {
      return true;
    }

    return false;
  }

  updateMinEndDate() {
    this.minEndDate = new Date(this.startDate);
    this.minEndDate.setDate(this.startDate.getDate() + 1);

    if (this.endDate < this.minEndDate) {
      this.endDate = new Date(this.minEndDate);
    }
  }

  submitForm() {
    this.loading = true;
    if (this.cycleName.trim() == '' || this.selectedEvaluations.length <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Couldn`t initialize evaluation cycle',
        detail: 'Please check all fields before submitting',
      });
      this.loading = false;
      return;
    }

    let request: CreateEvaluationPeriodDto = {
      name: this.cycleName,
      description: this.cycleDescription,
      startDate: this.startDate.toISOString().substring(0, 10),
      endDate: this.endDate.toISOString().substring(0, 10),
      evaluationIds: [],
    };

    for (let i = 0; i < this.selectedEvaluations.length; i++) {
      request.evaluationIds.push(this.selectedEvaluations[i].id);
    }

    this.evaluationCycleService.createEvaluationCycle(request).subscribe({
      next: (next) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Action success',
          detail: 'Evaluation cycle initialized succesfully',
        });
        this.loading = false;

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Couldn`t initialize evaluation cycle',
          detail: 'An unknown error has occurred. Try again later!',
        });
        this.loading = false;
        return;
      },
    });
  }
}
