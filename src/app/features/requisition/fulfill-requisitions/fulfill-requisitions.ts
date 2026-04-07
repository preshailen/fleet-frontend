import { Component, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { AuthService } from '../../../core/services/auth.service';
import { RequisitionService } from '../../../core/services/requisition.service';
import { SharedModule } from '../../../theme/shared/shared.module';
import { PdfFileDataModel } from '../../../core/models/requisition/pdf-file-data.model';
import { form } from '@angular/forms/signals';
import { HelpersService } from '../../../core/services/helpers.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RequisitionTable } from "../shared/requisition-table/requisition-table";
import { DisplaySpecifications } from '../shared/display-specifications/display-specifications';

@Component({
  selector: 'app-fulfill-requisitions',
  imports: [SharedModule, DisplaySpecifications, RequisitionTable],
  templateUrl: './fulfill-requisitions.html',
  styleUrl: './fulfill-requisitions.scss',
})
export class FulfillRequisitions {
  private sanitizer = inject(DomSanitizer);
  private requisitionService = inject(RequisitionService);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  public helperService = inject(HelpersService);
  requisition = signal<SafeHtml | null>(null);
  action = signal('Fulfill <i class="feather icon-package"></i>');
  filters = signal({ supplierEmail: this.authService.getUser()?.email, status: 'submitted' });
  id = signal<string | null>(null);
  MAX_SIZE = 10 * 1024 * 1024;
  EMPTY_MODEL = [
    { id: 0, file: null, touched: false, duplicate: false, isPdf: false, tooBig: false },
    { id: 1, file: null, touched: false, duplicate: false, isPdf: false, tooBig: false },
    { id: 2, file: null, touched: false, duplicate: false, isPdf: false, tooBig: false }
  ];
  filesData = signal<PdfFileDataModel>({
    quotes: this.EMPTY_MODEL
  });
  filesForm = form(this.filesData);

  async fulfill(id: string) {
    try {
      const html = await lastValueFrom(this.requisitionService.getRequisitionSpecificationById(id));
      const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
      this.requisition.set(safeHtml);
      if (this.requisition()) {
        this.id.set(id);
      }
    } catch(err) {
      this.alertService.error((err as any).error.message);
    }
  }
  async onFileSelected(event: Event, id: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    const isPdf = await this.isRealPdf(file);
    const tooBig = (file !== null && (file.size > this.MAX_SIZE));
    this.filesData.update(data => ({
      ...data,
      quotes: data.quotes.map(q =>
        q.id === id ? { ...q, file, isPdf, tooBig } : q
      )
    }));
    this.checkDuplicates();
  }
  cancel() {
    this.requisition.set(null);
    this.id.set(null);
    this.filesData.update(data => ({
      ...data,
      quotes: [...this.EMPTY_MODEL]
    }));
  }
  removeQuote(id: number) {
    this.filesData.update(data => ({
      ...data,
      quotes: data.quotes.filter(q => q.id !== id)
    }));
  }
  addQuote() {
    this.filesData.update(data => ({
      ...data,
      quotes: [...data.quotes, 
        { id: data.quotes.length ? Math.max(...data.quotes.map(q => q.id)) + 1: 1, file: null, touched: false, duplicate: false, isPdf: false, tooBig: false }]
    }));
  }
  viewQuote(id: number) {
    const quote = this.filesData().quotes.find(q => q.id === id);
    if (!quote?.file || quote?.duplicate || !quote?.isPdf || quote?.tooBig) {
      this.onFileBlur(id);
    } else {
      this.alertService.showPdfPreview(quote.file);
    }
  }
  async onSubmit(event: Event) {
    event.preventDefault();
    this.filesData.update(data => ({...data, quotes: data.quotes.map(q => q === q ? { ...q, touched: true } : q) }));
    const quotes = this.filesData().quotes;
    if ((quotes.length >= 3) && (quotes.every(q => q.file !== null)) && (quotes.every(q => q.isPdf === true)) && (quotes.every(q => q.duplicate === false)) && (quotes.every(q => q.tooBig === false))) {
      try {
        if (await this.alertService.confirm('Confirm fulfillment', '', 'Fulfill <i class="feather icon-package"></i>')) {
          const formData = new FormData();
          if (this.id()) {
            formData.append('id', String(this.id()));
          }
          quotes.forEach((q) => {
            if (q.file) {
              formData.append('files', q.file);
            }
          });
          if (await this.alertService.load(this.requisitionService.fulfillRequisition(formData))) {
            this.alertService.success('Requisition Fulfilled!');
            this.cancel();
            // this.requisitions.set(await lastValueFrom(this.requisitionService.getSubmittedRequisitions(this.authService.getUser()?.email)));
          } else {
            this.alertService.error('Requisition Failed!');
          }
        }
      } catch (error) {
        this.alertService.error((error as any).error.message)
      }
    }
  }
  onFileBlur(quoteId: number) {
    this.filesData.update(data => ({
      ...data,
      quotes: data.quotes.map(q =>
        q.id === quoteId ? { ...q, touched: true } : q
      )
    }));
  }
  checkDuplicates() {
    this.filesData.update(data => {
      const quotes = data.quotes.map(q => ({ ...q, duplicate: false }));

      const seen = new Map<string, number>();

      quotes.forEach((q) => {
        if (!q.file) return;

        const key = `${q.file.name}-${q.file.size}-${q.file.lastModified}`;

        if (seen.has(key)) {
          q.duplicate = true;

          const firstIndex = seen.get(key)!;
          quotes[firstIndex].duplicate = true;
        } else {
          seen.set(key, quotes.indexOf(q));
        }
      });
      return { ...data, quotes };
    });
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
}
