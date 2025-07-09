import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { TeamService } from '../../../services/team/team.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { TeamCommandRequestDto } from '../../../models/team/teamCommandRequestDto';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-create-team',
  imports: [
    StepperModule,
    ButtonModule,
    MultiSelectModule,
    CommonModule,
    FormsModule,
    SelectModule,
    InputTextModule,
    TagModule,
    CardModule,
    DataViewModule,
    DividerModule
  ],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css',
})
export class CreateTeamComponent {
  public users: any[] = [];
  public selectedUsers: any[] = [];
  public teamLead: any;
  public teamName: string = '';

  constructor(
    public messageService: MessageService,
    public teamService: TeamService,
    public userService: UserService,
    public router: Router
  ) {
    //populate user choice options
    this.userService.getUserChoices().subscribe({
      next: (next: any[]) => {
        this.users = next;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'An error occurred while fetching data',
          summary: 'If the problem persists, contact us!',
        });
      },
    });
  }

  validStep1() {
    if (this.selectedUsers.length > 0 && this.teamName.trim() != '') {
      return true;
    }

    return false;
  }

  validStep2() {
    if (this.teamLead != undefined) {
      return true;
    }

    return false;
  }

  setTeamLead() {
    this.selectedUsers.forEach((user) => {
      if (user.name.trim() == this.teamLead.name.trim()) {
        user.isTeamLead = true;
      } else {
        user.isTeamLead = false;
      }
    });
  }

  submitForm() {
    if (
      this.selectedUsers.length == 0 ||
      this.teamName.trim() == '' ||
      this.teamLead == undefined
    ) {
      this.messageService.add({
        severity: 'error',
        detail: 'An error occurred while creating team',
        summary: 'Please check all fields before submitting again!',
      });
      return;
    }

    let teamRequest: TeamCommandRequestDto = {
      name: this.teamName.trim(),
      memberships: [],
    };

    this.selectedUsers.forEach((user) => {
      teamRequest.memberships.push({
        userId: user.id,
        isTeamLead: user.isTeamLead,
      });
    });

    this.teamService.createTeam(teamRequest).subscribe({
      next: (next) => {
        this.router.navigate(['team/' + next.id]);
        this.messageService.add({
          severity: 'success',
          detail: 'Team ' + teamRequest.name + ' succesfully created!',
          summary: 'Action success',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          detail: error.error.error,
          summary: 'Action failure',
        });
      },
    });
  }
}
