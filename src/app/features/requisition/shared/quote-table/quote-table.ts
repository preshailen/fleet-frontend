import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { AlertService } from '../../../../core/services/alert.service';
import { lastValueFrom } from 'rxjs';
import { RequisitionService } from '../../../../core/services/requisition.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DisplaySpecifications } from '../display-specifications/display-specifications';

@Component({
  selector: 'app-quote-table',
  imports: [DisplaySpecifications],
  templateUrl: './quote-table.html',
  styleUrl: './quote-table.scss',
})
export class QuoteTable implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private requisitionService = inject(RequisitionService);
  private alertService = inject(AlertService);
  requisition = signal<SafeHtml | null>(null);
  quotes = signal<any[]>([]);
  id = input<any>();
  status = input<any>();
  action = output<any>();

  async ngOnInit() {
    const html = await lastValueFrom(this.requisitionService.getRequisitionSpecificationById(this.id()));
    const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    this.requisition.set(safeHtml);
    this.quotes.set(await lastValueFrom(this.requisitionService.getAttachedQuotes(this.id())));
  }
  async viewQuote(url: string) {
    try {
      this.alertService.showOnlinePdfPreview(await lastValueFrom(this.requisitionService.getSignedPdfUrl(url)));
    } catch(err: any) {
      this.alertService.error(err.error.message);
    }
  }
  async reject() {
    try {
      if(await this.alertService.reject()) {
        if (await lastValueFrom(this.requisitionService.rejectRequisition(this.id()))) {
          this.cancel();
        }
      }
    } catch(err: any) {
      this.alertService.error(err.error.message);
    }
  }
  rejectWith() {

  }
  cancel() {
    this.action.emit(true);
  }
  async approve() {
    try {
      if(await this.alertService.confirm('Confirm!', '', 'Confirm')) {
        if (await lastValueFrom(this.requisitionService.updateRequisitionStatus(this.id(), this.status()))) {
          this.cancel();
        }
      }
    } catch(err: any) {
      this.alertService.error(err.error.message);
    }
  }
}
