import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateEvaluationComponent } from './layout/forms/create-evaluation/create-evaluation.component';
import { HomeComponent } from './layout/home/home.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: HomeComponent,
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
