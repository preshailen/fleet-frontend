import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { ButtonControls } from '../shared/button-controls/button-controls';
import { HelpersService } from '../../../../core/services/helpers.service';
import { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-type-of-agreement',
  imports: [ButtonControls, Field],
  templateUrl: './type-of-agreement.html',
  styleUrls: ['./type-of-agreement.scss', '../shared/shared.scss'],
})
export class TypeOfAgreement {
  agreementForm = input<any>();
  validationForm = input<any>();
  submitted = signal(false);
  public helperService = inject(HelpersService);
  goBack = output<any>();
  goForward = output<any>();

  constructor() {
    effect(() => {
      if (this.agreementForm().type().value() !== 'Operating Lease with maintenance') {
        this.agreementForm().term().value.set(null);
      }
    })
  }
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
