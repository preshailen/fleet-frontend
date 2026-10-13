import { Component, inject, input, output, signal } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { HelpersService } from '../../../../core/services/helpers.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-details',
  imports: [Field, NgbTooltip],
  templateUrl: './basic-details.html',
  styleUrls: ['./basic-details.scss', '../shared/shared.scss']
})
export class BasicDetails {
  basicDetailsForm = input<any>();
  validationForm = input<any>();
  public submitted = signal(false);
  goForward = output<any>();
  public helperService = inject(HelpersService);
  
 
  next() {
    this.submitted.set(true);
    if (!this.validationForm().invalid() && !this.basicDetailsForm().supplierEmail().pending()) {
      this.goForward.emit(true);
    }
  }
}
