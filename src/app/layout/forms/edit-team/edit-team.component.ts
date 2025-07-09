import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TeamService } from '../../../services/team/team.service';
import { UserService } from '../../../services/user/user.service';
import { TeamCommandRequestDto } from '../../../models/team/teamCommandRequestDto';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-edit-team',
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
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css',
})
export class EditTeamComponent {
  public users: any[] = [];
  public selectedUsers: any[] = [];
  public teamLead: any = null;
  public teamName: string = '';
  public teamId: string;

  constructor(
    public messageService: MessageService,
    public teamService: TeamService,
    public userService: UserService,
    public router: Router
  ) {
    let urlTokens = router.routerState.snapshot.url.split('/');
    this.teamId = urlTokens[urlTokens.length - 1];
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

    //fetch previously selected users
    this.userService.getSelectedUserChoices(Number(this.teamId)).subscribe({
      next: (next) => {
        this.selectedUsers = next;
        this.selectedUsers.forEach((user) => {
          if (user.isTeamLead) {
            this.teamLead = user;
          }
        });
      },
      error: (next) => {
        this.messageService.add({
          severity: 'error',
          detail: 'An error occurred while fetching data',
          summary: 'If the problem persists, contact us!',
        });
      },
    });

    //fetch team name
    this.teamService.getTeamById(Number(this.teamId)).subscribe({
      next: (next) => {
        this.teamName = next.name;
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

    this.teamService.editTeam(this.teamId, teamRequest).subscribe({
      next: (next) => {
        this.router.navigate(['team/' + this.teamId]);
        this.messageService.add({
          severity: 'success',
          detail: 'Team succesfully edited!',
          summary: 'Action success',
        });
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          detail: error.error.error,
          summary: 'Action failure',
        });
      },
    });
  }

  onSelectedUsersChange() {
    if (
      this.teamLead &&
      !this.selectedUsers.some((user) => user.id === this.teamLead.id)
    ) {
      this.teamLead = null;
    }
  }
}
