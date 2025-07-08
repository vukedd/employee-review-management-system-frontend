import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team/team.service';
import { MembershipService } from '../../../services/membership/membership.service';
import { CommonModule } from '@angular/common';
import { ConcreteEvaluationService } from '../../../services/concrete-evaluation/concrete-evaluation.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CaroselSizeService } from '../../carosel/carosel.service';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MessageService, TreeNode } from 'primeng/api';
import { EmployeeNode } from '../../../models/team/employeeNode';

@Component({
  selector: 'app-employee-dashboard',
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    AccordionModule,
    RouterModule,
    OrganizationChartModule,
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
})
export class EmployeeDashboardComponent implements OnInit {
  public memberships: any[] = [];
  public pendingEvaluations: Map<number, any[]> = new Map<number, any[]>();
  public submittedEvaluations: Map<number, any[]> = new Map<number, any[]>();
  public hierarchyData: Map<number, any> = new Map<number, any>();

  constructor(
    private membershipService: MembershipService,
    private teamService: TeamService,
    private concreteEvaluationService: ConcreteEvaluationService,
    public caroselService: CaroselSizeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.membershipService.getMembershipsByUsername().subscribe({
      next: (next) => {
        this.memberships = next;

        // fetch all evaluations and hierarchy trees for this team
        for (let i = 0; i < this.memberships.length; i++) {
          let teamId = this.memberships[i].teamId;
          let teamLead = this.memberships[i].isTeamLead;

          this.concreteEvaluationService
            .getConcreteEvaluations(0, teamId)
            .subscribe({
              next: (next) => {
                this.pendingEvaluations.set(teamId, next);
              },
              error: (error) => {
                this.messageService.add({
                  summary: 'Error',
                  severity: 'error',
                  detail: 'An error ocurred while trying to fetch data!',
                });
              },
            });

          this.concreteEvaluationService
            .getConcreteEvaluations(1, teamId)
            .subscribe({
              next: (next) => {
                this.submittedEvaluations.set(teamId, next);
              },
              error: (error) => {
                this.messageService.add({
                  summary: 'Error',
                  severity: 'error',
                  detail: 'An error ocurred while trying to fetch data!',
                });
              },
            });

          if (teamLead) {
            this.teamService.getTeamHieararchy(teamId).subscribe({
              next: (next) => {
                this.hierarchyData.set(teamId, convertToOrgChartData(next));
              },
              error: (error) => {
                this.messageService.add({
                  summary: 'Error',
                  severity: 'error',
                  detail: 'An error ocurred while trying to fetch data!',
                });
              },
            });
          }
        }
      },
      error: (error) => {
        this.messageService.add({
          summary: 'Error',
          severity: 'error',
          detail: 'An error ocurred while trying to fetch data!',
        });
      },
    });

    function convertToOrgChartData(serverData: any) {

      const transformNode = (node: any, parentKey: any) => {
        const orgChartNode = {
          key: parentKey,
          label: node.label,
          expanded: true,
          data: node, 
          children: [],
        };

        if (node.children && node.children.length > 0) {
          orgChartNode.children = node.children.map(
            (child: any, index: any) => {
              const childKey = `${parentKey}-${index}`;
              return transformNode(child, childKey);
            }
          );
        }

        return orgChartNode;
      };

      if (!serverData) {
        return [];
      }

      const orgChartRoot = transformNode(serverData, '0');

      return [orgChartRoot];
    }
  }
}
