import { Component } from '@angular/core';
import { EmployeeDashboardComponent } from "../dashboards/employee-dashboard/employee-dashboard.component";
import { AuthService } from '../../services/auth/auth.service';
import { ConcreteEvaluationService } from '../../services/concrete-evaluation/concrete-evaluation.service';

@Component({
  selector: 'app-home',
  imports: [EmployeeDashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public username: string | null | undefined = "User";
  public pendingEvaluationCount: any = 0;

  constructor(
    private authService: AuthService,
    private concreteEvaluationService: ConcreteEvaluationService
  ) {
    this.username = authService.getUsername() ?? "User";
    concreteEvaluationService.getPendingEvaluationCountByUsername().subscribe({
      next: (next) => {
        this.pendingEvaluationCount = next;
      }, error: (error) => {}
    });
  }
}
