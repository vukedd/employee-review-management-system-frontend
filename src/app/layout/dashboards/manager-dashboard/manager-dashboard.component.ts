import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { StatisticsDto } from '../../../models/statistics/StatisticsDto';
import { DividerModule } from 'primeng/divider';
import { TeamService } from '../../../services/team/team.service';
import { EvaluationCycleService } from '../../../services/evaluation-cycle/evaluation-cycle.service';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConcreteEvaluationService } from '../../../services/concrete-evaluation/concrete-evaluation.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-manager-dashboard',
  imports: [
    SelectModule,
    CommonModule,
    ButtonModule,
    DividerModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css',
})
export class ManagerDashboardComponent {
  statistics: StatisticsDto | undefined;
  selectedTeam: any = { id: 0, name: 'All' };
  selectedCycle: any = { id: 0, name: 'All' };
  submittedEvaluations: any = [];

  public teamChoices: any = [
    {
      id: 0,
      name: 'All',
    },
  ];
  public cycleChoices: any = [
    {
      id: 0,
      name: 'All',
    },
  ];

  constructor(
    public teamService: TeamService,
    public evaluationCycleService: EvaluationCycleService,
    public messageService: MessageService,
    public concreteEvaluationService: ConcreteEvaluationService
  ) {
    evaluationCycleService.getCycleChoices().subscribe({
      next: (next: any[]) => {
        next.forEach((el) => {
          this.cycleChoices.push(el);
        });
      },
      error: (error) => {
        this.messageService.add({
          summary: 'Error',
          severity: 'error',
          detail: 'An error ocurred while trying to fetch data!',
        });
      },
    });

    teamService.getTeamChoices().subscribe({
      next: (next: any[]) => {
        next.forEach((el) => {
          this.teamChoices.push(el);
        });
      },
      error: (error) => {
        this.messageService.add({
          summary: 'Error',
          severity: 'error',
          detail: 'An error ocurred while trying to fetch data!',
        });
      },
    });
  }

  fetchData() {
    if (this.selectedTeam == undefined || this.selectedCycle == undefined) {
      this.messageService.add({
        summary: 'Action failure',
        severity: 'error',
        detail: 'Please check all fields, before re-submitting!',
      });
    }

    this.evaluationCycleService
      .getEvaluationCycleStatistics(this.selectedTeam.id, this.selectedCycle.id)
      .subscribe({
        next: (next) => {
          this.statistics = next;
        },
        error: (error) => {
          this.messageService.add({
            summary: 'Error',
            severity: 'error',
            detail: 'An error ocurred while trying to fetch data!',
          });
        },
      });

    this.concreteEvaluationService
      .getSubmittedEvaluations(this.selectedTeam.id, this.selectedCycle.id)
      .subscribe({
        next: (next) => {
          this.submittedEvaluations = next;
        },
        error: (error) => {
          this.messageService.add({
            summary: 'Error',
            severity: 'error',
            detail: 'An error ocurred while trying to fetch data!',
          });
        },
      });
  }
}
