import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { ButtonControls } from '../shared/button-controls/button-controls';
import { HelpersService } from '../../../../core/services/helpers.service';
import { Field } from '@angular/forms/signals';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DataService } from '../../../../core/services/data.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-specifications',
  imports: [ButtonControls, Field, NgSelectComponent],
  templateUrl: './specifications.html',
  styleUrls: ['./specifications.scss', '../shared/shared.scss']
})
export class Specifications implements OnInit {
  specificationForm = input<any>();
  validationForm = input<any>();
  submitted = signal(false);
  public helperService = inject(HelpersService);
  dataService = inject(DataService);
  goBack = output<any>();
  goForward = output<any>();
  lengthError = signal(false);
  engineSizeItems = signal<string[]>([]);
  fuelTypeItems = signal<string[]>([]);
  transmissionItems = signal<string[]>([]);

  constructor() {
    effect(() => {
      if (this.specificationForm().accessories().value().some((str: string) => str.length > 100)) {
        this.lengthError.set(true);
      } else {
        this.lengthError.set(false);
      }
    })
  }
  async ngOnInit() {
    this.engineSizeItems.set(await lastValueFrom(this.dataService.getEngineSizes()));
    this.fuelTypeItems.set(await lastValueFrom(this.dataService.getFuelTypes()));
    this.transmissionItems.set(await lastValueFrom(this.dataService.getTransmissionTypes()));
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
