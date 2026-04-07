import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ButtonControls } from '../shared/button-controls/button-controls';
import { HelpersService } from '../../../../core/services/helpers.service';
import { Field } from '@angular/forms/signals';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-specifications',
  imports: [ButtonControls, Field, NgSelectComponent],
  templateUrl: './specifications.html',
  styleUrls: ['./specifications.scss', '../shared/shared.scss']
})
export class Specifications {
  specificationForm = input<any>();
  validationForm = input<any>();
  submitted = signal(false);
  public helperService = inject(HelpersService);
  goBack = output<any>();
  goForward = output<any>();
  lengthError = signal(false);


  constructor() {
    effect(() => {
      if (this.specificationForm().accessories().value().some((str: string) => str.length > 100)) {
        this.lengthError.set(true);
      } else {
        this.lengthError.set(false);
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
