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
    const chartConfigs: ChartConfig[] = Object.entries((await lastValueFrom(this.reportingService.getTotals()))[0])
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
    console.log(await lastValueFrom(this.reportingService.getCumulativeTotals()))
    const chartConfigs: ChartConfig[] = Object.entries((await lastValueFrom(this.reportingService.getCumulativeTotals()))[0])
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
    if (key === 'year') {
      return 'Ageing'
    }
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
          },
          xAxisLabelClick: (_e, _ctx, config) => {
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
  const values = sortedData.map(d => d.cumulativeTotal);
  return {
    chart: { type: 'bar' },
    title: { text: `Cumulative Total until ${sortedData[0]?.lastDate ?? ''}` },
    yaxis: { title: { text: 'Number of Vehicles' } },
    series: [{
      name: 'Vehicles',
      data: values.map((value, index) => ({
        x: String(sortedData[index].group).trim(),
        y: value,
        fillColor: [
          '#008FFB',
          '#00E396',
          '#FEB019',
          '#775DD0',
          '#3F51B5',
          '#546E7A',
          '#D4526E',
          '#8D5B4C',
          '#F86624',
          '#2E294E',
          '#1B998B',
          '#C5D86D',
          '#F46036',
          '#2E86AB',
          '#A23B72',
          '#F18F01',
          '#C73E1D',
          '#6A4C93',
          '#1982C4',
          '#8AC926'
        ][index % 20]
      }))
    }]
  };
}

}