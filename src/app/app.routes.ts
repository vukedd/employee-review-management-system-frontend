import { Routes } from '@angular/router';
import { CreateEvaluationComponent } from './layout/forms/create-evaluation/create-evaluation.component';
import { HomeComponent } from './layout/home/home.component';
import { EvaluateComponent } from './layout/forms/evaluate/evaluate.component';
import { FeedbackListComponent } from './layout/feedback/feedback-list/feedback-list.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { roleGuard } from './guards/role/role.guard';
import { EditEvaluationComponent } from './layout/forms/edit-evaluation/edit-evaluation.component';
import { EvaluationDetailsComponent } from './layout/forms/evaluation-details/evaluation-details.component';
import { CreateTeamComponent } from './layout/forms/create-team/create-team.component';
import { TeamListComponent } from './layout/team/team-list/team-list.component';
import { TeamDetailsComponent } from './layout/team/team-details/team-details.component';
import { EditTeamComponent } from './layout/forms/edit-team/edit-team.component';
import { CreateEvaluationPeriodComponent } from './layout/evaluation-period/create-evaluation-period/create-evaluation-period.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'RateWise',
    canActivate: [],
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    title: 'Dashboard',
    canActivate: [AuthGuard],
  },
  {
    path: 'evaluation/create',
    component: CreateEvaluationComponent,
    title: 'Create evaluation',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'MANAGER',
    },
  },
  {
    path: 'evaluation/form/:id',
    component: EvaluateComponent,
    title: 'Evaluate',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'EMPLOYEE',
    },
  },
  {
    path: 'feedback',
    component: FeedbackListComponent,
    title: 'Feedbacks',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'EMPLOYEE',
    },
  },
  {
    path: 'evaluation/edit/:id',
    component: EditEvaluationComponent,
    title: 'Edit evaluation',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'EMPLOYEE',
    },
  },
  {
    path: 'evaluation/:id',
    component: EvaluationDetailsComponent,
    title: 'Evaluation',
    canActivate: [AuthGuard],
  },
  {
    path: 'team/create',
    component: CreateTeamComponent,
    title: 'Create team',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'MANAGER',
    },
  },
  {
    path: 'team',
    component: TeamListComponent,
    title: 'Teams',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'MANAGER',
    },
  },
  {
    path: 'team/:id',
    component: TeamDetailsComponent,
    title: 'Team',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'MANAGER',
    },
  },
  {
    path: 'team/edit/:id',
    component: EditTeamComponent,
    title: 'Team',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'MANAGER',
    },
  },
  {
    path: 'evaluation-period/create',
    component: CreateEvaluationPeriodComponent,
    title: 'Create evaluation period',
    canActivate: [AuthGuard, roleGuard],
    data: {
      expectedRole: 'MANAGER',
    },
  },
];
