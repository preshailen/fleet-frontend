import { Component, signal } from '@angular/core';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { RequisitionTable } from '../../shared/requisition-table/requisition-table';
import { QuoteTable } from '../../shared/quote-table/quote-table';

@Component({
  selector: 'app-finance-approval',
  imports: [SharedModule, RequisitionTable, QuoteTable],
  templateUrl: './finance-approval.html',
  styleUrl: './finance-approval.scss',
})
export class FinanceApproval {
  id = signal<string | null>(null);
  action = signal('View Requisition <i class="feather icon-eye"></i>');
  filters = signal({ status: 'costCentreApproved' });
  status = signal<string>('financeApproved');

  viewQuotes(id: string) {
    this.id.set(id);
  }
  cancel() {
    this.id.set(null);
  }
}
