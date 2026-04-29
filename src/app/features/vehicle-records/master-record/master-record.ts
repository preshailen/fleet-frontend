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
    sort: 'month'
  });
  limit_values = signal<string[]>([]);
  sort_values = signal<any[]>([]);
  columns = [
    { key: 'supplierName', label: 'Supplier Name', format: 'text' },
    { key: 'month', label: 'Month', format: 'month' },
    { key: 'businessUnit', label: 'Business Unit', format: 'text' },
    { key: 'divisionDepotDepartment', label: 'Division/Depot/Department', format: 'text' },
    { key: 'costCentre', label: 'Cost Centre', format: 'text' },
    { key: 'area', label: 'Area', format: 'text' },
    { key: 'province', label: 'Province', format: 'text' },
    { key: 'responsibleManager', label: 'Responsible Manager', format: 'text'},
    { key: 'rfqSentDate', label: 'RFQ Sent Date', format: 'date' },
    { key: 'quotesReceivedDate', label: 'Quotes Received Date', format: 'date' },
    { key: 'actualQuotationDays', label: 'Actual Quotation Days', format: 'number' },
    { key: 'targetQuotationDays', label: 'Target Quotation Days', format: 'number' },
    { key: 'varianceForQuoteDays', label: 'Variance For Quote Days', format: 'number' },
    { key: 'approvalOfBestQuoteDate', label: 'Approval Date', format: 'date' },
    { key: 'vehicleDeliveryDate', label: 'Delivery Date', format: 'date' },
    { key: 'actualDeliveryDays', label: 'Actual Delivery Days', format: 'number' },
    { key: 'targetDeliveryDays', label: 'Target Delivery Days', format: 'number' },
    { key: 'varianceForDeliveryDays', label: 'Variance For Delivery Days', format: 'number' },
    { key: 'regNo', label: 'Reg No', format: 'text' },
    { key: 'contractNo', label: 'Contract No', format: 'text' },
    { key: 'contractType', label: 'Contract Type', format: 'text' },
    { key: 'rateCategory', label: 'Rate Category', format: 'text' },
    { key: 'make', label: 'Make', format: 'text' },
    { key: 'model', label: 'Model', format: 'text' },
    { key: 'year', label: 'Year', format: 'number' },
    { key: 'fuelType', label: 'Fuel Type', format: 'text' },
    { key: 'engineCapacity', label: 'Engine Capacity', format: 'number' },
    { key: 'tyresAllocated', label: 'Tyres Allocated', format: 'number' },
    { key: 'tyresUsed', label: 'Tyres Used', format: 'number' },
    { key: 'retailPrice', label: 'Retail Price', format: 'money' },
    { key: 'discountAmount', label: 'Discount Amount', format: 'money' },
    { key: 'discountPercent', label: 'Discount %', format: 'discount-percent' },
    { key: 'accessoryAmount', label: 'Accessory Amount', format: 'money' },
    { key: 'financeSundries', label: 'Finance Sundries', format: 'money' },
    { key: 'interestPercent', label: 'Interest %', format: 'percent' },
    { key: 'residualValue', label: 'Residual Value', format: 'money' },
    { key: 'rvPercent', label: 'RV %', format: 'percent' },
    { key: 'startDate', label: 'Start Date', format: 'date' },
    { key: 'endDate', label: 'End Date', format: 'date' },
    { key: 'contractPeriod', label: 'Contract Period', format: 'number' },
    { key: 'inclusiveKmPerMonth', label: 'Inclusive Km Per Month', format: 'km' },
    { key: 'totalContractKm', label: 'Total Contract Km', format: 'km' },
    { key: 'licenceExpiryDate', label: 'Licence Expiry', format: 'date' },
    { key: 'odoStart', label: 'ODO Start', format: 'number' },
    { key: 'odoEnd', label: 'ODO End', format: 'number' },
    { key: 'kmTravelled', label: 'Km Travelled', format: 'km' },
    { key: 'kmTravelledLtd', label: 'Km Travelled LTD', format: 'km' },
    { key: 'averageLtdKm', label: 'Average LTD Km', format: 'km' },
    { key: 'fixedRental', label: 'Fixed Rental', format: 'money' },
    { key: 'repairsAndMaintenance', label: 'Repairs and Maintenance', format: 'money' },
    { key: 'licenceFee', label: 'Licence Fee', format: 'money' },
    { key: 'trackingCostAndServices', label: 'Tracking Cost and Services', format: 'money' },
    { key: 'adminFee', label: 'Admin Fee', format: 'money' },
    { key: 'totalFixedRentalExclVat', label: 'Total Fixed Rental Excl Vat', format: 'money' },
    { key: 'fixedRentalVat', label: 'Fixed Rental Vat', format: 'money' },
    { key: 'totalFixedRentalInclVat', label: 'Total Fixed Rental Incl Vat', format: 'money' },
    { key: 'startDateOfExcessBilling', label: 'Start Date of Excess Billing', format: 'date' },
    { key: 'endDateOfExcessBilling', label: 'End Date of Excess Billing', format: 'date' },
    { key: 'startOdoOfExcessBilling', label: 'Start ODO Excess Billing', format: 'number' },
    { key: 'endOdoOfExcessBilling', label: 'End ODO Excess Billing', format: 'number' },
    { key: 'totalKmTravelled', label: 'Total Km', format: 'km' },
    { key: 'allowedKm', label: 'Allowed Km', format: 'km' },
    { key: 'excessKmTravelled', label: 'Excess Km', format: 'km' },
    { key: 'excessRmCpk', label: 'Excess RM (CPK)', format: 'money' },
    { key: 'excessRvCpk', label: 'Excess RV (CPK)', format: 'money' },
    { key: 'excessRmAmount', label: 'Excess RM Amount', format: 'money' },
    { key: 'excessRvAmount', label: 'Excess RV Amount', format: 'money' },
    { key: 'totalExcessAmountExclVat', label: 'Total Excess Amount Excl Vat', format: 'money' },
    { key: 'excessVat', label: 'Excess Vat', format: 'money' },
    { key: 'totalExcessAmountInclVat', label: 'Total Excess Amount Incl Vat', format: 'money' },   
    { key: 'operatorDefault', label: 'Operator Default', format: 'money' },
    { key: 'accidentAndWriteOffs', label: 'Accident and Write Offs', format: 'money' },
    { key: 'tyres', label: 'Tyres', format: 'money' },
    { key: 'additionalCosts', label: 'Additional Costs', format: 'money' },
    { key: 'auxiliaryAmount', label: 'Auxiliary Amount', format: 'money' },
    { key: 'oocp', label: 'OOCP', format: 'money' },
    { key: 'fuelCost', label: 'Fuel Cost', format: 'money' },
    { key: 'fuelLitres', label: 'Fuel Litres', format: 'number' },
    { key: 'oilCost', label: 'Oil Cost', format: 'money' },
    { key: 'oilLitres', label: 'Oil Litres', format: 'number' },
    { key: 'monthlyFinesCost', label: 'Monthly Fines Cost', format: 'money' },
    { key: 'monthlyETollCost', label: 'Monthly E-Toll Cost', format: 'money' },
    { key: 'subtotalVariableCost', label: 'Subtotal Variable Cost', format: 'money' },
    { key: 'variableVat', label: 'Variable Vat', format: 'money' },
    { key: 'totalVariableCost', label: 'Total Variable Cost', format: 'money' },
    { key: 'totalCostInclVat', label: 'Total Cost Incl Vat', format: 'money' },
    { key: 'inputVat', label: 'Input Vat', format: 'money' },
    { key: 'totalCostExclInputVat', label: 'Total Cost Excl Input Vat', format: 'money' },
    { key: 'cpkTco', label: 'CPK TCO', format: 'money' },    
    { key: 'maintenanceDays', label: 'Maintenance Days', format: 'number' },
    { key: 'accidentsDays', label: 'Accidents Days', format: 'number' },
    { key: 'breakdownsDays', label: 'Breakdowns Days', format: 'number' },
    { key: 'totalAvailabilityPercent', label: 'Total Availability %', format: 'percent' },
    { key: 'restructuredContractEndDate', label: 'Restructured Contract End Date', format: 'date' },
    { key: 'restructuredContractPeriod', label: 'Restructured Contract Period', format: 'number' },
    { key: 'restructuredInclusiveKmPerMonth', label: 'Restructured Inclusive Km Per Month', format: 'number' },
    { key: 'fixedRentalPriorToRestructure', label: 'Fixed Rental Prior To Restructure', format: 'number' },
    { key: 'oversAndUndersInclTolerance', label: 'Overs And Unders Incl 5% Tolerance', format: 'number' },
    { key: 'estimatedReplacementDateTimeAndKm', label: 'Est. Replacement Date Time and Km', format: 'date' },
    { key: 'estimatedReplacementTime', label: 'Est. Replacement Time', format: 'date' },
    { key: 'estimatedReplacementKm', label: 'Est. Replacement Km', format: 'km' },
    { key: 'dealStatus', label: 'Deal Status', format: 'text' },
    { key: 'supplierResponsibleName', label: 'Supplier Responsible Name', format: 'text' },
    { key: 'excessRmYtd', label: 'Excess RM YTD', format: 'money' },
    { key: 'excessRvYtd', label: 'Excess RV YTD', format: 'money' },
    { key: 'underUtilisationRmYtd', label: 'Under Utilisation RM YTD', format: 'money' },
    { key: 'underUtilisationRmCpk', label: 'Under Utilisation RM (CPK)', format: 'money' },
    { key: 'totalUnderUtilisationRmAmountExclVat', label: 'Total Under Utilisation RM Amount Excl Vat', format: 'money' },
    { key: 'totalUnderUtilisationAmountInclVat', label: 'Total Under Utilisation Amount Incl Vat', format: 'money' },
    { key: 'dateSold', label: 'Date Sold', format: 'date' }
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
    const cols = this.columns.filter(col => col.format !== 'text');
    const asc = cols.map(col => ({ ...col, label: `${col.label} (Ascending)`}));
    const desc = cols.map(col => ({ ...col, key: `-${col.key}`, label: `${col.label} (Descending)` }));
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
  onSearch(event: Event) {
    this.query.update(q => ({ ...q, search: (event.target as HTMLInputElement).value, page: 1 }));
  }
}
