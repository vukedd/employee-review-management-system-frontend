import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: []
    },
];
