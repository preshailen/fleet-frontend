import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { AuthService } from '../../../core/services/auth.service';
import { RequisitionService } from '../../../core/services/requisition.service';
import { SharedModule } from '../../../theme/shared/shared.module';
import { RequisitionTable } from "../shared/requisition-table/requisition-table";

@Component({
  selector: 'app-view-quotes',
  imports: [SharedModule, RequisitionTable],
  templateUrl: './view-quotes.html',
  styleUrl: './view-quotes.scss',
})
export class ViewQuotes {
  private requisitionService = inject(RequisitionService);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  quotes = signal<any[]>([]);
  id = signal<string | null>(null);
  requisition = signal<any>(null);
  action = signal('View <i class="feather icon-eye"></i>');
  filters = signal({ contactEmail: this.authService.getUser()?.email, status: 'fulfilled' });
  
  async viewQuotes(id: string) {
    try {
      this.quotes.set(await lastValueFrom(this.requisitionService.getAttachedQuotes(id)));
      if (this.quotes().length > 0) {
        this.id.set(id);
      }
    } catch(err) {
      this.alertService.error((err as any).error.message);
    }
  }
  async viewQuote(url: string) {
    try {
      this.alertService.showOnlinePdfPreview(await lastValueFrom(this.requisitionService.getSignedPdfUrl(url)));
    } catch(err) {
      this.alertService.error((err as any).error.message);
    }
  }
  async setPreferredQuote() {
    try {
      const quoteId = await this.alertService.selectPreferredQuote(this.quotes());
      if (quoteId) {
        if (await this.alertService.load(this.requisitionService.selectPreferredQuote(this.id(), quoteId))) {
          this.alertService.success('Successfully set preferred quote');
          this.cancel();
        } else {
          this.alertService.error('Setting preferred quote failed!');
        }
      }
    } catch (error) {
      this.alertService.error((error as any).error.message)
    }
  }
  cancel() {
    this.requisition.set(null);
    this.quotes.set([]);
    this.id.set(null);
  }
}
