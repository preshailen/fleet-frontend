import { Component, computed, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { VehicleRecordsService } from '../../../core/services/vehicle-records.service';
import { AlertService } from '../../../core/services/alert.service';
import { SharedModule } from '../../../theme/shared/shared.module';
import { DataService } from '../../../core/services/data.service';
import { DoubleScroll } from '../../../theme/shared/components/double-scroll/double-scroll';

@Component({
  selector: 'app-master-record',
  imports: [SharedModule, DoubleScroll],
  templateUrl: './master-record.html',
  styleUrl: './master-record.scss',
})
export class MasterRecord implements OnInit{
  vehicleRecordsService = inject(VehicleRecordsService);
  private alertService = inject(AlertService);
  dataService = inject(DataService);
  records = signal<any[]>([]);
  meta = signal({
    total: 0,
    pages: 0
  });
  query = signal({
    page: 1,
    limit: localStorage.getItem('fm_limit') !== null ? Number(localStorage.getItem('fm_limit')): 5,
    search: '',
    sort: 'regNo'
  });
  limit_values = signal<string[]>([]);
  sort_values = signal<any[]>([]);
  columns = [
    { key: 'regNo', label: 'Reg No', format: 'text' },
    { key: 'year', label: 'Year', format: 'text' },
    { key: 'make', label: 'Make', format: 'text' },
    { key: 'rateCategory', label: 'Rate Category', format: 'text' },
    { key: 'model', label: 'Model', format: 'text' },
    { key: 'fuelType', label: 'Fuel Type', format: 'text' },
    { key: 'engineCapacity', label: 'Engine Capacity', format: 'text' },
    { key: 'businessUnit', label: 'Business Unit', format: 'text' },
    { key: 'divisionDepotDepartment', label: 'Division/Depot/Department', format: 'text' },
    { key: 'costCentre', label: 'Cost Centre', format: 'text' },
    { key: 'area', label: 'Area', format: 'text' },
    { key: 'province', label: 'Province', format: 'text' },
    { key: 'responsibleManager', label: 'Responsible Manager', format: 'text'},
    { key: 'startDate', label: 'Start Date', format: 'date' },
    { key: 'endDate', label: 'End Date', format: 'date' },
    { key: 'contractPeriod', label: 'Contract Period', format: 'number' },
    { key: 'dealStatus', label: 'Deal Status', format: 'text' }
  ];
  pages = computed(() => {
    const total = this.meta().pages;
    const current = this.query().page;
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  constructor() {
    effect(() => this.loadRecords(this.query()));
  }
  async ngOnInit(): Promise<void> {
    this.initLimit();
    this.initSort();
  }
  async loadRecords(query: any) {
    try {
      const result: any = await this.alertService.load(this.vehicleRecordsService.getRecords(query));
      if (result) {
        this.alertService.success('Loaded records');
      }
          
      this.records.set(result.data);
      this.meta.set({
        total: result.pagination.total,
        pages: result.pagination.pages
      });
    } catch (err: any) {
      this.alertService.error(err.error.message);
    }
  }
  async initLimit() {
    this.limit_values.set(await lastValueFrom(this.dataService.getLimitValues()));
    if (!localStorage.getItem('fm_limit')) {
      localStorage.setItem('fm_limit', '5');
    }
  }
  initSort() {
    const asc = this.columns.map(col => ({ ...col, label: `${col.label} (Ascending)`}));
    const desc = this.columns.map(col => ({ ...col, key: `-${col.key}`, label: `${col.label} (Descending)` }));
    this.sort_values.set([...asc, ...desc].sort((a, b) => a.label.localeCompare(b.label)));
  }
  changePage(page: number) {
    if (page < 1 || page > this.meta().pages) return;

    this.query.update(q => ({ ...q, page: page }));
  }
  nextPage() {
    this.changePage(this.query().page + 1);
  }
  prevPage() {
    this.changePage(this.query().page - 1);
  }
  formatValue(value: any, format: string): string {
    if (value === null || value === undefined || value === '') return '-';

    const date = new Date(value);

    switch (format) {

      case 'month':
        return new Intl.DateTimeFormat('en-ZA', {
          year: 'numeric',
          month: 'long'
        }).format(date);

      case 'date':
        return new Intl.DateTimeFormat('en-ZA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(date);

      case 'money':
        return new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR'
        }).format(Number(value));

      case 'km':
        return `${Number(value).toLocaleString('en-ZA')} km`;

      case 'percent':
        return `${Number(value)}%`;

      case 'discount-percent':
        return `${Number(value) * 100 }%`;
      case 'number':
        return Number(value).toLocaleString('en-ZA');

      default:
        return value;
    }
  }
  onLimit(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.query.update(q => ({ ...q, limit: value, page: 1 }));
    localStorage.setItem('fm_limit', String(value));
  }
  onSort(event: Event) {
    this.query.update(q => ({ ...q, sort: (event.target as HTMLSelectElement).value, page: 1 }));
  }
}
