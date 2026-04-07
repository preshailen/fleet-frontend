import { Component, inject, input, output, signal } from '@angular/core';
import { HelpersService } from '../../../../core/services/helpers.service';
import { ButtonControls } from '../shared/button-controls/button-controls';
import { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-operational-requirements',
  imports: [ButtonControls, Field],
  templateUrl: './operational-requirements.html',
  styleUrls: ['./operational-requirements.scss', '../shared/shared.scss']
})
export class OperationalRequirements {
  requirementsForm = input<any>();
  validationForm = input<any>();
  submitted = signal(false);
  public helperService = inject(HelpersService);
  goBack = output<any>();
  goForward = output<any>();


  previous() {
    this.goBack.emit(true);
  }
  
  next() {
    this.submitted.set(true);
    if (!this.validationForm().invalid()) {
      this.goForward.emit(true);
    }
  }
}
