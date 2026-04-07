import { Component, signal } from '@angular/core';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { RequisitionTable } from "../../shared/requisition-table/requisition-table";
import { QuoteTable } from '../../shared/quote-table/quote-table';

@Component({
  selector: 'app-cost-centre-approval',
  imports: [SharedModule, RequisitionTable, QuoteTable],
  templateUrl: './cost-centre-approval.html',
  styleUrl: './cost-centre-approval.scss',
})
export class CostCentreApproval {
  id = signal<string | null>(null);
  action = signal('View Requisition <i class="feather icon-eye"></i>');
  filters = signal({ status: 'quoteSelected' });
  status = signal<string>('costCentreApproved');
  viewQuotes(id: string) {
    this.id.set(id);
  }
  cancel() {
    this.id.set(null);
  }
}
