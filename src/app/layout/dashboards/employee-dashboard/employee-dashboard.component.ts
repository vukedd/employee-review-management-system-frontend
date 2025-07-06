import { Component, OnInit} from '@angular/core';
import { TeamService } from '../../../services/team/team.service';
import { MembershipService } from '../../../services/membership/membership.service';
import { CommonModule } from '@angular/common';
import { ConcreteEvaluationService } from '../../../services/concrete-evaluation/concrete-evaluation.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CaroselSizeService } from '../../carosel/carosel.service';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-employee-dashboard',
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    AccordionModule
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  public memberships: any[] = []
  public pendingEvaluations: Map<number, any[]> = new Map<number,any[]>();
  public submittedEvaluations: Map<number, any[]> = new Map<number,any[]>();


  constructor(
    private membershipService: MembershipService,
    private teamService: TeamService,
    private concreteEvaluationService: ConcreteEvaluationService,
    public caroselService: CaroselSizeService
  ) {
    
    membershipService.getMembershipsByUsername().subscribe({
      next: (next) => {
        this.memberships = next;
        for (let i = 0; i < this.memberships.length; i ++) {

          concreteEvaluationService.getConcreteEvaluations(0, this.memberships[i].teamId).subscribe({
            next: (next) => {
              this.pendingEvaluations.set(this.memberships[i].teamId, next);
            },
            error: (error) =>{
              console.log(error);
            }
          })

          concreteEvaluationService.getConcreteEvaluations(1, this.memberships[i].teamId).subscribe({
            next: (next) => {
              this.submittedEvaluations.set(this.memberships[i].teamId, next);
            },
            error: (error) =>{
              console.log(error);
            }
          })

        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

}
