import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateEvaluationComponent } from './layout/forms/create-evaluation/create-evaluation.component';
import { HomeComponent } from './layout/home/home.component';
import { EvaluateComponent } from './layout/forms/evaluate/evaluate.component';
import { FeedbackListComponent } from './layout/feedback/feedback-list/feedback-list.component';

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
    },
    {
        path: 'evaluate/:id',
        component: EvaluateComponent,
        title: 'Evaluate',
        canActivate: [AuthGuard]
    },
    {
        path: 'feedback/:username',
        component: FeedbackListComponent,
        title: "Feedbacks",
        canActivate: [AuthGuard]
    }
];
