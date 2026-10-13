import { Component, inject, input, output, signal } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { HelpersService } from '../../../../core/services/helpers.service';

@Component({
  selector: 'app-compliance-information',
  imports: [Field],
  templateUrl: './compliance-information.html',
  styleUrls: ['./compliance-information.scss', '../shared/shared.scss']
})
export class ComplianceInformation {
  complianceForm = input<any>();
  validationForm = input<any>();
  submitted = signal(false);
  public helperService = inject(HelpersService);
  goBack = output<any>();
  finish = output<any>();

  previous() {
    this.goBack.emit(true);
  }
  
  create() {
    this.submitted.set(true);
    if (!this.validationForm().invalid()) {
      this.finish.emit(true);
    }
  }
}
