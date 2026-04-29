// angular import
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Field, form, required } from '@angular/forms/signals';

// project import
import { SharedModule } from '../../../theme/shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { HelpersService } from '../../../core/services/helpers.service';
import { EMPTY_LOGIN_MODEL, LoginModel } from '../../../core/models/auth.model';
import { RouteService } from '../../../core/services/route.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterModule, SharedModule, Field],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  public helperService = inject(HelpersService);
  private routeService = inject(RouteService);

  submitted = signal(false);
  loginModal = signal<LoginModel>(EMPTY_LOGIN_MODEL);
  loginForm = form(this.loginModal, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  async onSubmit(event: Event) {
    this.submitted.set(true);
    event.preventDefault();
    if (!this.loginForm().invalid()) {
      try {
        if (await this.alertService.load(this.authService.login(this.loginModal()))) {
          this.alertService.success('Successfully logged in!');
          this.routeService.goToAnalytics();
        }
      } catch (err: any) {
        this.alertService.error(err.error.message);
      }
    }
  }
}
