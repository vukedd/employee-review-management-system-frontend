import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { CreateTeamRequestDto } from '../../../models/team/createTeamRequestDto';
import { TeamService } from '../../../services/team/team.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

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
    this.users.forEach((user) => {
      if (user.name == this.teamLead.name) {
        user.isLead = true;
        return;
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

    let teamRequest: CreateTeamRequestDto = {
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
        this.router.navigate(['dashboard']);
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
