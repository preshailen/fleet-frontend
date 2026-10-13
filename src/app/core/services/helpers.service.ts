import { Injectable, Signal } from '@angular/core';
import { PDF, Quote } from '../models/requisition/quote.model';
import { Excel } from '../models/vehicle-records/excel.model';

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
  controlFileSelect(quote: PDF) {
    if ((!quote.file || quote.duplicate || !quote.isPdf || quote.tooBig) && quote.touched) {
      return { 'is-invalid': true }
    } else if (quote.file && !quote.duplicate && quote.isPdf && !quote.tooBig) {
      return { 'is-valid': true  }
    } else {
      return { 'is-invalid': false, 'is-valid': false };
    }
  }
  controlExcelSelect(excel: Excel) {
    if ((!excel.file || !excel.isExcel || excel.tooBig || excel.backendError) && excel.touched) {
      return { 'is-invalid': true }
    } else if (excel.file && excel.isExcel && !excel.tooBig && !excel.backendError) {
      return { 'is-valid': true  }
    } else {
      return { 'is-invalid': false, 'is-valid': false };
    }
  }

  blockInvalid(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
