import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-evaluation-card',
  imports: [
    ButtonModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './evaluation-card.component.html',
  styleUrl: './evaluation-card.component.css'
})
export class EvaluationCardComponent {
  @Input() evaluation!: any;
  @Input() type: 0 | 1 | 2 = 0; // 0 = pending evaluations, 1 = submitted evaluations, 2 = lead peer evaluations

  public currDate: Date = new Date();

  constructor() {
    
  }
}
