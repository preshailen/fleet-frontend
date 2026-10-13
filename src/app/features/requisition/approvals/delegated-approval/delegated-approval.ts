import { Component, signal } from '@angular/core';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { RequisitionTable } from '../../shared/requisition-table/requisition-table';
import { QuoteTable } from '../../shared/quote-table/quote-table';

@Component({
  selector: 'app-delegated-approval',
  imports: [SharedModule, RequisitionTable, QuoteTable],
  templateUrl: './delegated-approval.html',
  styleUrl: './delegated-approval.scss',
})
export class DelegatedApproval {
  id = signal<string | null>(null);
  action = signal('View Requisition <i class="feather icon-eye"></i>');
  filters = signal({ status: 'financeApproved' });
  status = signal<string>('delegateApproved');

  viewQuotes(id: string) {
    this.id.set(id);
  }
  cancel() {
    this.id.set(null);
  }
}
