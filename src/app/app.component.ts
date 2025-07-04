import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { ToastModule } from 'primeng/toast';
import { ToastsPositionService } from './layout/toasts/toasts.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-review-management-system-frontend';
  /**
   *
   */
  constructor(
    public toastPositionService: ToastsPositionService
  ) {}
}
