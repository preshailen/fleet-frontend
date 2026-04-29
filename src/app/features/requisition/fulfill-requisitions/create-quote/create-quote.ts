import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { HelpersService } from '../../../../core/services/helpers.service';
import { applyEach, Field, form, max, maxLength, min, required, validate } from '@angular/forms/signals';
import { EMPTY_QUOTE_MODEL, FULL_QUOTE_MODEL, Quote } from '../../../../core/models/requisition/quote.model';
import { ValidatorService } from '../../../../core/services/validator.service';
import { Requisition } from '../../../../core/models/requisition/requisition.model';
import { lastValueFrom } from 'rxjs';
import { RequisitionService } from '../../../../core/services/requisition.service';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-create-quote',
  imports: [SharedModule, Field],
  templateUrl: './create-quote.html',
  styleUrl: './create-quote.scss',
})
export class CreateQuote implements OnInit {
  public helperService = inject(HelpersService);
  validatorService = inject(ValidatorService);
  requisitionService = inject(RequisitionService);
  dataService = inject(DataService);
  id = input<any>();
  names = input<any>();
  cancel = output<any>();
  newQuote = output<any>();
  submitted = signal(false);
  lengthError = signal(false);
  engineSizeItems = signal<string[]>([]);
  fuelTypeItems = signal<string[]>([]);
  transmissionItems = signal<string[]>([]);
  requisition = signal<Requisition | null>(null);
  quoteModel = signal<Quote>(FULL_QUOTE_MODEL);
  MAX_SIZE = 10 * 1024 * 1024;

  constructor() {
    effect(() => {
      if (this.quoteForm.evaluation.additionalAccessories().value().some((str: string) => str.length > 100)) {
        this.lengthError.set(true);
      } else {
        this.lengthError.set(false);
      }
    })
  }
  async ngOnInit() {
    this.requisition.set(await lastValueFrom(this.requisitionService.getRequisitionById(this.id()!)))
    this.engineSizeItems.set(await lastValueFrom(this.dataService.getEngineSizes()));
    this.fuelTypeItems.set(await lastValueFrom(this.dataService.getFuelTypes()));
    this.transmissionItems.set(await lastValueFrom(this.dataService.getTransmissionTypes()));
  }
  quoteForm = form(this.quoteModel, (schemaPath) => {
    required(schemaPath.summary.unitPrice, { message: 'Unit Price is required'})
    min(schemaPath.summary.unitPrice, 1, { message: 'Unit Price must be 1 or more' });
    max(schemaPath.summary.unitPrice, 100000000, { message: 'Unit Price must be 100000000 or less' });
    required(schemaPath.summary.deliveryLeadTime, { message: 'Delivery Lead Time is required' });
    validate(schemaPath.summary.deliveryLeadTime, this.validatorService.maxLengthValidator({ max: 100, message: 'Delivery Lead Time must be at most 100 characters' }));
    validate(schemaPath.summary.deliveryLeadTime, this.validatorService.emptyValidator());
    required(schemaPath.summary.warranty, { message: 'Warranty is required' });
    validate(schemaPath.summary.warranty, this.validatorService.maxLengthValidator({ max: 100, message: 'Warranty must be at most 100 characters' }));
    validate(schemaPath.summary.warranty, this.validatorService.emptyValidator());

    required(schemaPath.evaluation.engineCapacity, { message: 'Engine Capacity is required' });
    required(schemaPath.evaluation.fuelType, { message: 'Fuel Type is required' });
    required(schemaPath.evaluation.transmission, { message: 'Transmission is required' });
    required(schemaPath.evaluation.safetyFeatures, { message: 'Safety Features are required' });
    validate(schemaPath.evaluation.safetyFeatures, this.validatorService.maxLengthValidator({ max: 100, message: 'Safety Features must be at most 100 characters' }));
    validate(schemaPath.evaluation.safetyFeatures, this.validatorService.emptyValidator());
    maxLength(schemaPath.evaluation.additionalAccessories, 10, { message: 'A maximum of 10 accessories are allowed'});
    applyEach(schemaPath.evaluation.additionalAccessories, (accessoryPath) => {
      validate(accessoryPath, this.validatorService.maxLengthValidator({ max: 100, message: 'Accessory must be at most 100 characters' }));
    });
    required(schemaPath.evaluation.efficiency, { message: 'Efficiency is required'})
    min(schemaPath.evaluation.efficiency, 1, { message: 'Efficiency must be 1 or more' });
    max(schemaPath.evaluation.efficiency, 50, { message: 'Efficiency must be 50 or less' });
    validate(schemaPath.evaluation.additionalInformation, this.validatorService.maxLengthValidator({ max: 1000, message: 'Additional Information must be at most 1000 characters' }));
    validate(schemaPath.evaluation.additionalInformation, this.validatorService.emptyValidator());

    required(schemaPath.commercial.vehicleRetailPrice, { message: 'Vehicle Retail Price is required'})
    min(schemaPath.commercial.vehicleRetailPrice, 1, { message: 'Vehicle Retail Price must be 1 or more' });
    max(schemaPath.commercial.vehicleRetailPrice, 100000000, { message: 'Vehicle Retail Price must be 100000000 or less' });
    required(schemaPath.commercial.deliveryCosts, { message: 'Delivery Costs are required'})
    min(schemaPath.commercial.deliveryCosts, 1, { message: 'Delivery Costs must be 1 or more' });
    max(schemaPath.commercial.deliveryCosts, 100000000, { message: 'Delivery Costs must be 100000000 or less' });
    validate(schemaPath.commercial.optionalExtras, this.validatorService.maxLengthValidator({ max: 100, message: 'Optional Extras must be at most 100 characters' }));
    validate(schemaPath.commercial.optionalExtras, this.validatorService.emptyValidator());
    min(schemaPath.commercial.otherCosts, 1, { message: 'Other Costs must be 1 or more' });
    max(schemaPath.commercial.otherCosts, 100000000, { message: 'Other Costs must be 100000000 or less' });
    required(schemaPath.commercial.totalCosts, { message: 'Total Costs are required'})
    min(schemaPath.commercial.totalCosts, 1, { message: 'Total Costs must be 1 or more' });
    max(schemaPath.commercial.totalCosts, 100000000, { message: 'Total Costs must be 100000000 or less' });
  });
  exitQuote() {
    this.cancel.emit('exit');
  }
  onSubmit(event: any) {
    event.preventDefault();
    this.submitted.set(true);
    this.quoteModel.update(form => { return { ...form, pdf: { ...form.pdf, touched: true } }; });
    if (!this.quoteForm().invalid() && this.checkPdf(this.quoteModel().pdf)) {
      this.newQuote.emit(this.quoteModel());
    }
  }
  async onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    const isPdf = await this.isRealPdf(file);
    const tooBig = (file !== null && (file.size > this.MAX_SIZE));
    let duplicate = false;
    if (this.names().includes(file?.name)) {
      duplicate = true;
    }
    this.quoteModel.update(form => { return { ...form, pdf: { ...form.pdf, file: file, touched: true, isPdf: isPdf, tooBig: tooBig, duplicate: duplicate } }; });
  }
  onFileCancelled(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.quoteModel.update(form => { return { ...form, pdf: { ...form.pdf, touched: true } }; }); 
  }
  async isRealPdf(file: File | null): Promise<boolean> {
    if (!file) return false;

    const isPdfMime = file.type === 'application/pdf';
    const isPdfExt = file.name.toLowerCase().endsWith('.pdf');

    if (!isPdfMime || !isPdfExt) return false;

    const headerBlob = file.slice(0, 5);
    const headerBuffer = await headerBlob.arrayBuffer();
    const header = new TextDecoder().decode(headerBuffer);

    if (header !== '%PDF-') return false;

    const footerBlob = file.slice(file.size - 20, file.size);
    const footerBuffer = await footerBlob.arrayBuffer();
    const footer = new TextDecoder().decode(footerBuffer);

    if (!footer.includes('%%EOF')) return false;

    return true;
  }
  checkPdf(pdf: any | null) {
    if (pdf.file && pdf.isPdf && !pdf.duplicate && !pdf.tooBig) {
      return true;
    } else {
      return false;
    }
  }
}
