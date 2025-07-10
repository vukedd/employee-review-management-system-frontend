import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastsPositionService } from '../toasts/toasts.service';

@Component({
  selector: 'app-landing-page',
  imports: [ToastModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  /**
   *
   */
  constructor(private messageService: MessageService, private route: ActivatedRoute, public toastService: ToastsPositionService) {
    
  }
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    if (queryParams.get('verification') === 'success') {
      this.messageService.add({
        summary: 'Account succesfully verified!',
        severity: 'success',
      });
    } else if (queryParams.get('verification') === 'failed') {
      this.messageService.add({
        summary: 'An error occurred while trying to verify account!',
        severity: 'error',
      });
    }
  }
}
