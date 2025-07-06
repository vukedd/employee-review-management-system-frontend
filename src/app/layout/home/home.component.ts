import { Component } from '@angular/core';
import { EmployeeDashboardComponent } from "../dashboards/employee-dashboard/employee-dashboard.component";

@Component({
  selector: 'app-home',
  imports: [EmployeeDashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = "";

  constructor() {
    
  }
}
