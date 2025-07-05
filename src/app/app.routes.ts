import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateEvaluationComponent } from './layout/forms/create-evaluation/create-evaluation.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [AuthGuard]
    },
    {
        path: 'evaluation-create',
        component: CreateEvaluationComponent,
        title: 'Create evaluation',
        canActivate: [AuthGuard]
    }
];
