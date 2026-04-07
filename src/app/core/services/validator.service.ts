import { Injectable } from '@angular/core';
import { customError } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  maxLengthValidator(options: { max: number, message: string }) {
    return ({ value }: { value: () => string }): any => {
      return value().length > options.max ? customError({ kind: 'max-length', message: options.message }): undefined;
    };
  }
  telephoneValidator() {
    return ({ value }: { value: () => string }): any => {
      return /^\+?[0-9][0-9\s\-()]{6,19}$/.test(value().trim()) ? undefined: customError({ kind: 'invalid-phone', message: 'Invalid phone number' });
    };
  }
  emptyValidator(options?: { message: string }) {
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
}
