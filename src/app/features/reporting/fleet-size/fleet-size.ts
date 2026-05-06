import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../../theme/shared/shared.module';
import { lastValueFrom } from 'rxjs';
import { ReportingService } from '../../../core/services/reporting.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-fleet-size',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './fleet-size.html',
  styleUrl: './fleet-size.scss',
})
export class FleetSize implements OnInit {
  reportingService = inject(ReportingService);
  alertService = inject(AlertService);

  businessUnitOptions = signal<ApexOptions>(this.createBarOptions());
  divisionDepotDepartmentOptions = signal<ApexOptions>(this.createBarOptions());
  costCentreOptions = signal<ApexOptions>(this.createBarOptions());
  managerOptions = signal<ApexOptions>(this.createBarOptions());
  rateOptions = signal<ApexOptions>(this.createBarOptions());
  makeOptions = signal<ApexOptions>(this.createBarOptions());
  modelOptions = signal<ApexOptions>(this.createBarOptions());
  yearOptions = signal<ApexOptions>(this.createBarOptions());
  engineOptions = signal<ApexOptions>(this.createBarOptions());
  provinceOptions = signal<ApexOptions>(this.createBarOptions());
  areaOptions = signal<ApexOptions>(this.createBarOptions());
  dealOptions = signal<ApexOptions>(this.createBarOptions());
  supplierOptions = signal<ApexOptions>(this.createBarOptions());

  optionsByYear = signal<{ id: string; data: ApexOptions }[]>([]);
  optionsByMonth = signal<{ id: string; data: ApexOptions }[]>([]);

  ngOnInit() {
    this.loadChartsByYear();
    this.loadChartsByMonth();
  }
  async loadChartsByYear() {
    try {
      const res = (await lastValueFrom(this.reportingService.getTotals('year')))[0];
      this.businessUnitOptions.set(this.mapData(res.businessUnit, this.createBarOptions(), 'year'));
      this.divisionDepotDepartmentOptions.set(this.mapData(res.divisionDepotDepartment, this.createBarOptions(), 'year'));
      this.costCentreOptions.set(this.mapData(res.costCentre, this.createBarOptions(), 'year'));
      this.managerOptions.set(this.mapData(res.responsibleManager, this.createBarOptions(), 'year'));
      this.rateOptions.set(this.mapData(res.rateCategory, this.createBarOptions(), 'year'));
      this.makeOptions.set(this.mapData(res.make, this.createBarOptions(), 'year'));
      this.modelOptions.set(this.mapData(res.model, this.createBarOptions(), 'year'));
      this.yearOptions.set(this.mapData(res.year, this.createBarOptions(), 'year'));
      this.engineOptions.set(this.mapData(res.engineCapacity, this.createBarOptions(), 'year'));
      this.provinceOptions.set(this.mapData(res.province, this.createBarOptions(), 'year'));
      this.areaOptions.set(this.mapData(res.area, this.createBarOptions(), 'year'));
      this.dealOptions.set(this.mapData(res.dealStatus, this.createBarOptions(), 'year'));
      this.supplierOptions.set(this.mapData(res.supplierName, this.createBarOptions(), 'year'));
      this.optionsByYear.set([
        { id: 'Business Unit', data: this.businessUnitOptions() },
        { id: 'Division/Depot/Department', data: this.divisionDepotDepartmentOptions() },
        { id: 'Cost Centre', data: this.costCentreOptions() },
        { id: 'Responsible Manager', data: this.managerOptions() },
        { id: 'Rate Category', data: this.rateOptions() },
        { id: 'Make', data: this.makeOptions() },
        { id: 'Model', data: this.modelOptions() },
        { id: 'Year', data: this.yearOptions() },
        { id: 'Engine Capacity', data: this.engineOptions() },
        { id: 'Province', data: this.provinceOptions() },
        { id: 'Area', data: this.areaOptions() },
        { id: 'Deal Status', data: this.dealOptions() },
        { id: 'Supplier', data: this.supplierOptions() }
      ]);
    } catch(err) {
      this.alertService.error('Error loading charts');
    }
  }
  async loadChartsByMonth() {
    try {
      const res = (await lastValueFrom(this.reportingService.getTotals('month')))[0];
      this.businessUnitOptions.set(this.mapData(res.businessUnit, this.createBarOptions(), 'month'));
      this.divisionDepotDepartmentOptions.set(this.mapData(res.divisionDepotDepartment, this.createBarOptions(), 'month'));
      this.costCentreOptions.set(this.mapData(res.costCentre, this.createBarOptions(), 'month'));
      this.managerOptions.set(this.mapData(res.responsibleManager, this.createBarOptions(), 'month'));
      this.rateOptions.set(this.mapData(res.rateCategory, this.createBarOptions(), 'month'));
      this.makeOptions.set(this.mapData(res.make, this.createBarOptions(), 'month'));
      this.modelOptions.set(this.mapData(res.model, this.createBarOptions(), 'month'));
      this.yearOptions.set(this.mapData(res.year, this.createBarOptions(), 'month'));
      this.engineOptions.set(this.mapData(res.engineCapacity, this.createBarOptions(), 'month'));
      this.provinceOptions.set(this.mapData(res.province, this.createBarOptions(), 'month'));
      this.areaOptions.set(this.mapData(res.area, this.createBarOptions(), 'month'));
      this.dealOptions.set(this.mapData(res.dealStatus, this.createBarOptions(), 'month'));
      this.supplierOptions.set(this.mapData(res.supplierName, this.createBarOptions(), 'month'));
      this.optionsByMonth.set([
        { id: 'Business Unit', data: this.businessUnitOptions() },
        { id: 'Division/Depot/Department', data: this.divisionDepotDepartmentOptions() },
        { id: 'Cost Centre', data: this.costCentreOptions() },
        { id: 'Responsible Manager', data: this.managerOptions() },
        { id: 'Rate Category', data: this.rateOptions() },
        { id: 'Make', data: this.makeOptions() },
        { id: 'Model', data: this.modelOptions() },
        { id: 'Year', data: this.yearOptions() },
        { id: 'Engine Capacity', data: this.engineOptions() },
        { id: 'Province', data: this.provinceOptions() },
        { id: 'Area', data: this.areaOptions() },
        { id: 'Deal Status', data: this.dealOptions() },
        { id: 'Supplier', data: this.supplierOptions() }
      ]);
    } catch(err) {
      this.alertService.error('Error loading charts');
    }
  }
  mapData(data: any, options: ApexOptions, period: 'year' | 'month'): ApexOptions {
    const isMonth = period === 'month';
    const units = [...new Set(data.map((d: any) => d.group))];
    const categories = [
  ...new Map(
    data.map((d: any) => {
      const key = isMonth
        ? `${d.year}-${d.month}`
        : `${d.year}`;

      return [key, d];
    })
  ).keys()
];

categories.sort((a: any, b: any) => {
  if (isMonth) {
    const [ay, am] = a.split('-').map(Number);
    const [by, bm] = b.split('-').map(Number);
    return ay !== by ? ay - by : am - bm;
  }
  return Number(a) - Number(b);
});
    const series: ApexAxisChartSeries = units.map(unit => ({
      name: unit as string,
      data: categories.map((cat: any) => {
        const found = data.find((d: any) => {
          if (isMonth) {
            return `${d.year}-${d.month}` === cat && d.group === unit;
          }
          return d.year === Number(cat) && d.group === unit;
        });
        return found ? found.total : 0;
      })
    }));

    return {...options, series, xaxis: { categories } };
  }
  createBarOptions(): ApexOptions {
    return {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        stackType: 'normal'
      },
      colors: [
        '#4099ff',
        '#ffb64d',
        '#ff5370',
        '#2ed8b6',
        '#0e9e4a',
        '#7759de',
        '#00bcd4',
        '#748892',
        '#d6d6d6',
        '#eceff1',
        '#263238'
      ],
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      series: [],
      xaxis: {
        categories: []
      },
      tooltip: {
        y: {
          formatter: (val: number): string => {
            if (val >= 1000) {
              return (val / 1000).toFixed(1) + 'K';
            }
            return val.toString();
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    };
  }
}
