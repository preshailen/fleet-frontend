import { Component, computed, inject, signal } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';
import { AuthService } from '../../../core/services/auth.service';
import { RequisitionService } from '../../../core/services/requisition.service';
import { SharedModule } from '../../../theme/shared/shared.module';
import { HelpersService } from '../../../core/services/helpers.service';

import { RequisitionTable } from "../shared/requisition-table/requisition-table";
import { CreateQuote } from './create-quote/create-quote';
import { Quote } from '../../../core/models/requisition/quote.model';

@Component({
  selector: 'app-fulfill-requisitions',
  imports: [SharedModule, RequisitionTable, CreateQuote],
  templateUrl: './fulfill-requisitions.html',
  styleUrl: './fulfill-requisitions.scss',
})
export class FulfillRequisitions {
  private requisitionService = inject(RequisitionService);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  public helperService = inject(HelpersService);
  action = signal('Fulfill <i class="feather icon-package"></i>');
  filters = signal({ supplierEmail: this.authService.getUser()?.email, status: 'submitted' });
  id = signal<string | null>(null);
  createMode = signal<boolean>(false);
  quotes = signal<Quote[]>([]);
  names = computed(() => this.quotes().map(f => f.pdf.file?.name));
  submitAttempt = signal(false);

  fulfill(id: string) {
    this.id.set(id);
  }
  cancel() {
    this.id.set(null);
  }
  createQuote() {
    this.createMode.set(true);
  }
  exitQuote(value: any) {
    this.createMode.set(false);
  }
  deleteQuote(index: number) {
    this.quotes.update(quotes => {
      quotes.splice(index, 1);
      return [...quotes];
    });
  }
  addQuote(quote: Quote) {
    this.createMode.set(false);
    this.quotes.update(data => [...data, quote]);
  }
  viewQuote(file: File | null) {
    console.log(file)
    if (file) {
      this.alertService.showPdfPreview(file);
    }
  }
  async onSubmit(event: Event) {
    event.preventDefault();
    this.submitAttempt.set(true);
    /*this.filesData.update(data => ({...data, quotes: data.quotes.map(q => q === q ? { ...q, touched: true } : q) }));
    const quotes = this.filesData().quotes;
    if ((quotes.length >= 3) && (quotes.every(q => q.file !== null)) && (quotes.every(q => q.isPdf === true)) && (quotes.every(q => q.duplicate === false)) && (quotes.every(q => q.tooBig === false))) {
      try {
        if (await this.alertService.confirm('Confirm fulfillment', 'Are you ready to fulfill Requisition?', 'Fulfill <i class="feather icon-package"></i>')) {
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
          } else {
            this.alertService.error('Requisition Failed!');
          }
        }
      } catch (error) {
        this.alertService.error((error as any).error.message)
      }
    }*/
  }
}
