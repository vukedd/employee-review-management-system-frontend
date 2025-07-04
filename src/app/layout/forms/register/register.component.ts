import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    TooltipModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
submitRegisterRequest() {
throw new Error('Method not implemented.');
}
  loading: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,20}$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,20}$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{5,15}$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")])
  });

    @Output() switchToLogin = new EventEmitter<void>();

    onSignInClick(): void {
      this.switchToLogin.emit();
    }
}
