import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '../../../services/team/team.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { MembershipService } from '../../../services/membership/membership.service';

@Component({
  selector: 'app-team-details',
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    DividerModule,
    CardModule
  ],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css',
})
export class TeamDetailsComponent {
  public teamName: string = '';
  public team: any;
  public teammates: any;

  constructor(
    teamService: TeamService, 
    router: Router,
    messageService: MessageService,
    membershipService: MembershipService
  ) {
    let url = router.routerState.snapshot.url.split('/');
    let teamId = url[url.length - 1];

    teamService.getTeamById(Number(teamId)).subscribe({
      next: (next) => {
        this.team = next;
        this.teamName = this.team.name;
      },
      error: (error) => {
        messageService.add({
          severity: 'error',
          detail: 'An error occurred while fetching data',
          summary: 'Please check all fields before submitting again!',
        });
        router.navigate(["/dashboard"]);
      },
    });

    membershipService.getTeammatesByTeamId(Number(teamId)).subscribe({
      next: (next) => {
        this.teammates = next;
      }, 
      error: (error) => {
        messageService.add({
          severity: 'error',
          summary: 'Action error',
          detail: 'An error occurred while fetching data!'
        })
      }
    })
  }
}
