import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css',
  imports: [RouterOutlet, MatIconModule, MatToolbarModule, MatButtonModule]
})

export class AppComponent implements OnDestroy {
  private router = inject(Router);
  loginService = inject(LoginService);
  private logoutSubscription: Subscription | null = null;

  logout() {
    this.logoutSubscription = this.loginService.logOut().subscribe({
      next: _ => {
        this.navigateToLogin();
      },
      error: _ => {
        this.navigateToLogin();
      }
    })
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }
  
}

