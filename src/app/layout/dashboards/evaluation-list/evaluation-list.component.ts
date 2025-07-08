import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule } from "primeng/carousel";
import { EvaluationCardComponent } from "../evaluation-card/evaluation-card.component";

@Component({
  selector: 'app-evaluation-list',
  imports: [
    CarouselModule,
    CommonModule,
    EvaluationCardComponent
],
  templateUrl: './evaluation-list.component.html',
  styleUrl: './evaluation-list.component.css'
})
export class EvaluationListComponent {
  @Input() title: string = '';
  @Input() evaluations: any[] = [];
  @Input() type: 0 | 1 | 2 = 0; // 0 = pending evaluations, 1 = submitted evaluations, 2 = lead peer evaluations
  @Input() emptyMessage: string = 'No evaluations have been found!';
  
}
