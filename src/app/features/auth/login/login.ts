// angular import
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Field, form, required } from '@angular/forms/signals';

// project import
import { SharedModule } from '../../../theme/shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterModule, SharedModule, Field],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  submitted = signal(false);
  loginModal = signal<{ email: string; password: string }>({
    email: '',
    password: ''
  });
  loginForm = form(this.loginModal, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  async onSubmit(event: Event) {
    this.submitted.set(true);
    event.preventDefault();
    if (!this.loginForm().invalid()) {
      try {
        if (await this.alertService.load(this.authService.login(this.loginModal().email, this.loginModal().password))) {
          this.alertService.success('Successfully logged in!');
          this.router.navigate(['/analytics']);
        }
      } catch (err) {
        this.alertService.error((err as any).error.message);
      }
    }
  }
}
