import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    TooltipModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();


  loading: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
     private router: Router,
     private messageService: MessageService
  ) {}

  onSignUpClick(): void {
    this.switchToRegister.emit();
  }

  isValid(): unknown {
    return this.loginForm.invalid;
  }

  submitLoginRequest() {
    this.loading = true
    if (this.loginForm.invalid) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Login Failed', 
        detail: "Validation Failed. Please check the fields below."
      });

      this.loading=false;
      return; 
    }
    
    this.authService.sendLoginRequest({
      username: this.loginForm.controls.username.value ?? '',
      password: this.loginForm.controls.password.value ?? ''
    }).subscribe({
      next: (response) => {
        this.authService.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        })

        this.loading=false;
        this.loginForm.reset();
        this.loginSuccess.emit();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        let message = "";
        switch(error.status) {
          case 0:
            message = "An unexpected error has occurred, please try again later!";
            break;
          default:
            message = error.error.error;
            break;
        }

        this.messageService.add({ 
          severity: 'error', 
          summary: 'Login Failed', 
          detail: error.error.error
        });
        this.loading=false;
      }
    })
  }
}
