// angular import
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Field, form, minLength, required, validate } from '@angular/forms/signals';

// project import
import { SharedModule } from '../../../theme/shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { lastValueFrom } from 'rxjs';
import { ValidatorService } from '../../../core/services/validator.service';
import { HelpersService } from '../../../core/services/helpers.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, SharedModule, Field],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private validatorService = inject(ValidatorService);
  public helperService = inject(HelpersService);
  private router = inject(Router);
  submitted = signal(false);

  registerModel = signal<{ email: string; password: string, role: string | null }>({
    email: '',
    password: '',
    role: null
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    validate(schemaPath.email, this.validatorService.emailValidator())
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 12, { message: 'Password must be at least 12 characters' });
    required(schemaPath.role, { message: 'Role is required' });
  });

  async onSubmit(event: Event) {
    this.submitted.set(true);
    event.preventDefault();
    if (!this.registerForm().invalid()) {
      try {
        const result = (await this.alertService.load(this.authService.register(this.registerModel())));
        this.alertService.success(result.message)
        this.router.navigate(['/auth/login'])
      } catch (err: any) {
        this.alertService.error(err.error.message)
      }
    }
  }
}
