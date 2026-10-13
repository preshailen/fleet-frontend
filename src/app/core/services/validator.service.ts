import { inject, Injectable } from '@angular/core';
import { customError, debounce } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  
  private authService = inject(AuthService);

  maxLengthValidator(options: { max: number, message: string }) {
    return ({ value }: { value: () => string }): any => {
      return value().length > options.max ? customError({ kind: 'max-length', message: options.message }): undefined;
    };
  }
  telephoneValidator() {
    return ({ value }: { value: () => string }): any => {
      return /^\+?[0-9][0-9\s\-()]{9,19}$/.test(value().trim()) ? undefined: customError({ kind: 'invalid-phone', message: 'Invalid phone number' });
    };
  }
  emptyValidator() {
    return ({ value }: { value: () => string }): any => {
      if(value()) {
        return String(value() ?? '').trim().length === 0 ? customError({ kind: 'empty-space', message: 'The text is empty' }): undefined;
      }
    };
  }
  emailValidator() {
    return ({ value }: { value: () => string }): any => {
      return /^\S+@\S+\.\S+$/.test(value().trim()) ? undefined: customError({ kind: 'invalid-email', message: 'Invalid email address' });
    };
  }
  
  sameEmailValidator(options: { userEmail: string }) {
    return ({ value }: { value: () => string }): any => {
      if(value()) {
        return value() === options.userEmail ? customError({ kind: 'same-email', message: 'Supplier email cannot be the same as user email' }): undefined;
      }
    };
  }

  checkNonSupplierExists() {
    return {
      request: ({ value: email }: any) => `${environment.apiUrl}/api/auth/checkNonSupplierExists/${email()}`,
      onSuccess: (res: any) => {
        return res ? customError({ kind: 'non-supplier-exists', message: 'Email already exists as a non-supplier' }): undefined;
      },
      onError: (error: any) => console.error('Validation error:', error)
    };
  }
}
