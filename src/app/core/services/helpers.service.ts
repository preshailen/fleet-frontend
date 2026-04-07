import { Injectable, Signal } from '@angular/core';
import { Quote } from '../models/requisition/pdf-file-data.model';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  isInvalid(field: any, submitted: Signal<boolean>) {
    return field().invalid() && (field().touched() || submitted());
  }
  isValid(field: any, submitted: any) {
    return field().valid() && (field().touched() || submitted()); 
  }
  controlClass(control: any, submitted: any) {
    return { 
      'is-invalid': this.isInvalid(control, submitted),
      'is-valid': this.isValid(control, submitted) 
    }
  }
  isFieldTouchedOrSubmitted(field: any, submitted: any) {
    if (field().touched() || submitted()) {
      return true;
    } else {
      return false
    }
  }
  controlFileSelect(quote: Quote) {
    if ((!quote.file || quote.duplicate || !quote.isPdf || quote.tooBig) && quote.touched) {
      return { 'is-invalid': true }
    } else if (quote.file && !quote.duplicate && quote.isPdf && !quote.tooBig) {
      return { 'is-valid': true  }
    } else {
      return { 'is-invalid': false, 'is-valid': false };
    }
  }

  formatDurationIntoDays(minutes: number): string {
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = Math.floor(minutes % 60);
    const seconds = Math.round((minutes % 1) * 60);
    if (seconds === 60) {
      return this.formatDurationIntoDays(minutes + 1 / 60);
    }
    if (days > 0) {
      return `${days}d ${hours}h ${mins}m`;
    }
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    if (mins > 0) {
      return `${mins}m`;
    }
    return `${seconds}s`;
  }
}
