import { Component, computed, inject, input, output, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { RequisitionService } from '../../../../core/services/requisition.service';
import { SharedModule } from '../../../../theme/shared/shared.module';

@Component({
  selector: 'app-requisition-table',
  imports: [SharedModule],
  templateUrl: './requisition-table.html',
  styleUrl: './requisition-table.scss',
})
export class RequisitionTable {
  private alertService = inject(AlertService);
  private requisitionService = inject(RequisitionService);
  action = input<any>();
  doActionOutput = output<any>();
  requisitions = signal<any[]>([]);
  pagination = signal<any>({
    page: 1,
    pages: 0,
    total: 0,
    limit: 5
  });
  filters = input<any>();
  pages = computed(() => {
    const total = this.pagination().pages;
    const current = this.pagination().page;

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
 
  async ngOnInit(): Promise<void> {
    this.loadRequisitions();
  }
  async loadRequisitions() {
    try {
      const result: any = await lastValueFrom(this.requisitionService.getRequisitions({
        page: this.pagination().page,
        limit: this.pagination().limit,
        ...this.filters()
      }));
      this.requisitions.set(result.data);
      this.pagination.set(result.pagination)
    } catch(err: any) {
      this.alertService.error(err.error.message);
    }
  }
  changePage(page: number) {
    if (page < 1 || page > this.pagination().pages) return;
    this.pagination.update(p => ({ ...p, page }));
    this.loadRequisitions();
  }
  nextPage() {
    this.changePage(this.pagination().page + 1);
  }
  prevPage() {
    this.changePage(this.pagination().page - 1);
  }
  doAction(data: any) {
    this.doActionOutput.emit(data);
  }
}
