import { Component } from '@angular/core';
import { TeamService } from '../../../services/team/team.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-team-list',
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent {
  public teams: any[] = [];

  constructor(
    public teamService: TeamService,
    public messageService: MessageService
  ) {
    teamService.getAllTeams().subscribe({
      next: (next: any[]) => {
        this.teams = next;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'An error occurred while fetching data',
          summary: 'Please check all fields before submitting again!',
        });
      },
    });
  }
}
