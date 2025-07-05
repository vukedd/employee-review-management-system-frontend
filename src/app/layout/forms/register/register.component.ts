import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    TooltipModule,
    ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() switchToLogin = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<void>();

  loading: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,20}$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,20}$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{5,15}$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")])
  });
  
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onSignInClick(): void {
    this.switchToLogin.emit();
  }

  onRegisterSuccess(): void {
    this.registerSuccess.emit();
  }

  isValid(): unknown {
    return this.registerForm.invalid;
  }

  submitRegisterRequest() {
    this.loading = true;
    if (this.registerForm.invalid) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Register Failed', 
        detail: "Validation failed, please check the fields below!"
      });
      this.loading = false;
    }

    this.authService.sendRegisterRequest({
      username: this.registerForm.controls.username.value ?? '',
      password: this.registerForm.controls.password.value ?? '',
      firstName: this.registerForm.controls.firstName.value ?? '',
      lastName: this.registerForm.controls.lastName.value ?? '',
      email: this.registerForm.controls.email.value ?? ''
    }).subscribe({
      next: (next) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration success',
          detail: 'You have registered succesfully!',
        });
        this.loading = false;
        this.onRegisterSuccess();
        this.registerForm.reset();
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
          summary: 'Register Failed', 
          detail: error.error.error
        });
        this.loading = false;
      }
    });

  }
}
