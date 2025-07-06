import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from "../forms/login/login.component";
import { RegisterComponent } from "../forms/register/register.component";
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [ButtonModule, 
    DialogModule, 
    LoginComponent, 
    RegisterComponent,
    CommonModule,
    RouterLink,
    RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogin: boolean = false;
  isRegister: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  handleRegisterSuccess() {
    this.isRegister = false;
    this.isLogin = false;
  }

  handleSwitchToLogin(): void {
    this.isRegister = false;
    this.isLogin = true;
  }

  handleSwitchToRegister(): void {
    this.isLogin = false;
    this.isRegister = true;
  }

  handleLoginSuccess(): void {
    this.isLogin = false;
    this.isRegister = false;
    this.router.navigate(['dashboard']);
  }

  openLoginModal() {
    this.isLogin = true;
  }

  openRegisterModal(){
    this.isRegister = true;
  }
}
