import { Component, inject, OnInit, signal } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { VehicleRecordsService } from '../../../../core/services/vehicle-records.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-size-reporting',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './size-reporting.html',
  styleUrl: './size-reporting.scss',
})
export class SizeReporting implements OnInit {
  vehicleService = inject(VehicleRecordsService);

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

  options = signal<{ id: string; data: ApexOptions }[]>([]);

  async ngOnInit() {
    this.businessUnitOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('businessUnit')), this.businessUnitOptions()));
    this.divisionDepotDepartmentOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('divisionDepotDepartment')), this.divisionDepotDepartmentOptions()));
    this.costCentreOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('costCentre')), this.costCentreOptions()));
    this.managerOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('responsibleManager')), this.managerOptions()));
    this.rateOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('rateCategory')), this.rateOptions()));
    this.makeOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('make')), this.makeOptions()));
    this.modelOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('model')), this.modelOptions()));
    this.yearOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('year')), this.yearOptions()));
    this.engineOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('engineCapacity')), this.engineOptions()));
    this.provinceOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('province')), this.provinceOptions()));
    this.areaOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('area')), this.areaOptions()));
    this.dealOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('dealStatus')), this.dealOptions()));
    this.supplierOptions.set(this.mapData(await lastValueFrom(this.vehicleService.getTotals('supplierName')), this.supplierOptions()));

    this.options.set([
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
    
  }
  mapData(data: any, options: ApexOptions): ApexOptions {
    const categories = [...new Set(data.map((d: any) => `${d.year}`))];
    const units = [...new Set(data.map((d: any) => d.group))];
    const series: ApexAxisChartSeries = units.map(unit => {
      return {
        name: (unit as string),
        data: categories.map((year: any) => {
          const found = data.find((d: any) => d.group === unit && d.year === Number(year));
          return found ? found.total : 0;
        })
      };
    });
    return { ...options, series, xaxis: { categories } };
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
