import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [AuthGuard]
    },
];
