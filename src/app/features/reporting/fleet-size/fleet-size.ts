import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../../theme/shared/shared.module';
import { lastValueFrom } from 'rxjs';
import { ReportingService } from '../../../core/services/reporting.service';
import { AlertService } from '../../../core/services/alert.service';

interface ChartConfig {
  key: string;
  title: string;
  originalData: any[];
  selectedYear: number | null;
  options: ApexOptions;
}

@Component({
  selector: 'app-fleet-size',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './fleet-size.html',
  styleUrl: './fleet-size.scss',
})
export class FleetSize implements OnInit {
  reportingService = inject(ReportingService);
  alertService = inject(AlertService);
  chartsPerYearAndMonthsOptions = signal<ChartConfig[]>([]);
  chartsCumulativeOptions = signal<ChartConfig[]>([]);

  async ngOnInit() {
    this.configurePerYearAndMonth();
    this.configureCumulative();
  }
  async configurePerYearAndMonth() {
    const res = (await lastValueFrom(this.reportingService.getTotals()))[0];
    const chartConfigs: ChartConfig[] = Object.entries(res)
    .map(([key, value]: any) => ({
      key,
      title: this.formatTitle(key),
      originalData: value,
      selectedYear: null,
      options: this.mapYearData(value, key)
    }));

    this.chartsPerYearAndMonthsOptions.set(chartConfigs);
  }
  async configureCumulative() {
    const res = (await lastValueFrom(this.reportingService.getCumulativeTotals()))[0];
    console.log(res);
    const chartConfigs: ChartConfig[] = Object.entries(res)
    .map(([key, value]: any) => ({
      key,
      title: this.formatTitle(key),
      originalData: value,
      selectedYear: null,
      options: this.mapCumulativeData(value)
    }));
    this.chartsCumulativeOptions.set(chartConfigs);
  }
  
  formatTitle(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, c => c.toUpperCase());
  }

  mapYearData(data: any[], chartKey: string): ApexOptions {
    const years: number[] = [...new Set(data.map(d => Number(d.year)))].sort((a, b) => a - b);
    const groups: string[] = [...new Set(data.map(d => String(d.group).trim()))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    return {
      chart: {
        type: 'bar',
        events: {
          dataPointSelection: (_e, _ctx, config) => {
            const selectedYear = years[config.dataPointIndex];
            this.openMonthView(chartKey, selectedYear);
          }
        }
      },
      xaxis: {
        title: { text: 'Year' },
        categories: years
      },
      yaxis: [
        {
          title: {
            text: 'Vehicles'
          }
        }
      ],
      series: groups.map(group => ({
        name: group,
        data: years.map(year => {
          return data
            .filter(d => String(d.group).trim() === group && Number(d.year) === year)
            .reduce((sum, item) => sum + item.total, 0);
        })
      }))
    };
  }

  mapMonthData(
  data: any[],
  selectedYear: number
): ApexOptions {

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const groups: string[] = [...new Set(data.map(d => String(d.group).trim()))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));


  return {
    chart: {
      type: 'bar'
    },
    title: {
      text: `${selectedYear} Monthly Breakdown`
    },
    xaxis: {
      title: { text: 'Month' },
      categories: months
    },
    yaxis: [
      {
        title: {
          text: 'Vehicles'
        }
      }
    ],
    series: groups.map(group => ({
      name: group,

      data: months.map((_, index) => {

        const monthNumber = index + 1;

        return data
          .filter(d =>
            String(d.group).trim() === group &&
            Number(d.year) === selectedYear &&
            Number(d.month) === monthNumber
          )
          .reduce(
            (sum, item) => sum + item.total,
            0
          );
      })
    }))
  };
}

  openMonthView(chartKey: string, year: number) {

  this.chartsPerYearAndMonthsOptions.update(charts =>
    charts.map(chart => {

      if (chart.key !== chartKey) {
        return chart;
      }

      return {
        ...chart,
        selectedYear: year,
        options: this.mapMonthData(
          chart.originalData,
          year
        )
      };
    })
  );
}

  goBack(chartKey: string) {

  this.chartsPerYearAndMonthsOptions.update(charts =>
    charts.map(chart => {

      if (chart.key !== chartKey) {
        return chart;
      }

      return {
        ...chart,
        selectedYear: null,
        options: this.mapYearData(
          chart.originalData,
          chart.key
        )
      };
    })
  );
}
  mapCumulativeData(data: any[]): ApexOptions {
    const sortedData = [...data].sort((a, b) => b.cumulativeTotal - a.cumulativeTotal);
    return {
      chart: {
        type: 'bar',
        height: 600,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true
        }
      },
      xaxis: {
        title: { text: `Cumulative Total for the year until ${sortedData[0]?.lastDate ?? ''}` },
        categories: sortedData.map(d => String(d.group).trim())
      },
      series: [
        {
          name: 'Vehicles',
          data: sortedData.map(d => d.cumulativeTotal)
        }
      ]
    };
  }

}