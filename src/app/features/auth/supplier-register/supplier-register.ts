import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { ValidatorService } from '../../../core/services/validator.service';
import { HelpersService } from '../../../core/services/helpers.service';
import { Router, RouterModule } from '@angular/router';
import { EMPTY_SUPPLIER_REGISTER_MODEL, RegisterModel } from '../../../core/models/auth.model';
import { Field, form, minLength, required, validate } from '@angular/forms/signals';
import { SharedModule } from '../../../theme/shared/shared.module';
import { RouteService } from '../../../core/services/route.service';

@Component({
  selector: 'app-supplier-register',
  imports: [Field, RouterModule, SharedModule],
  templateUrl: './supplier-register.html',
  styleUrl: './supplier-register.scss',
})
export class SupplierRegister {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private validatorService = inject(ValidatorService);
  public helperService = inject(HelpersService);
  private routeService = inject(RouteService);
  submitted = signal(false);

  registerModel = signal<RegisterModel>(EMPTY_SUPPLIER_REGISTER_MODEL);

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    validate(schemaPath.email, this.validatorService.emailValidator())
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 12, { message: 'Password must be at least 12 characters' });
  });

  async onSubmit(event: Event) {
    this.submitted.set(true);
    event.preventDefault();
    if (!this.registerForm().invalid()) {
      try {
        if (await this.alertService.load(this.authService.register(this.registerModel()))) {
          this.alertService.success('Successfully registered!')
          this.routeService.goToLogin();
        }
      } catch (err: any) {
        this.alertService.error(err.error.message)
      }
    }
  }
}
