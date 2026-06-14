import { Component, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';

import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-weekly-overview',
  imports: [AgCharts],
  templateUrl: './weekly-overview.component.html',
  styleUrl: './weekly-overview.component.css',
})
export class WeeklyOverviewComponent {
  public feedTypeChartOptions: AgChartOptions = {};
  public nappyChangeChartOptions: AgChartOptions = {};
  apiService = inject(ApiService);
  chartData: any[] = [];
  
  constructor() {
    this.feedTypeChart();
    this.nappyChangeChart();
  }

  nappyChangeChart() {
     this.apiService.getWeeklyOverview().subscribe(
      (response: any) => {
        console.log('Weekly Overview Data:', response);
        this.chartData = response.payload;
        this.nappyChangeChartOptions = {
          title: {
            text: 'Nappy Change',
          },
          subtitle: {
            text: 'Weekly Overview of Nappy Changes',
          },
          data: this.chartData,
          series: [
            {
              type: 'bar',
              xKey: 'dayOfWeek',
              yKey: 'nappyChangeTypes.peeOnly',
              legendItemName: 'Pee',
              stackGroup: 'nappy',
              label: {
                enabled: true,
              },
            },
            {
              type: 'bar',
              xKey: 'dayOfWeek',
              yKey: 'nappyChangeTypes.pooOnly',
              legendItemName: 'Poo',
              stackGroup: 'nappy',
              label: {
                enabled: true,
              },
            },
             {
              type: 'bar',
              xKey: 'dayOfWeek',
              yKey: 'nappyChangeTypes.both',
              legendItemName: 'Both',
              stackGroup: 'nappy',
              label: {
                enabled: true,
              },
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching weekly overview data:', error);
      },
    );
  }

  feedTypeChart() {
    this.apiService.getWeeklyOverview().subscribe(
      (response: any) => {
        console.log('Weekly Overview Data:', response);
        this.chartData = response.payload;
        this.feedTypeChartOptions = {
          title: {
            text: 'Feed Type',
          },
          subtitle: {
            text: 'Weekly Overview of Feed Types',
          },
          data: this.chartData,
          series: [
            {
              type: 'bar',
              xKey: 'dayOfWeek',
              yKey: 'feedTypes.Formula',
              legendItemName: 'Formula',
              stackGroup: 'feed',
              label: {
                enabled: true,
              },
            },
            {
              type: 'bar',
              xKey: 'dayOfWeek',
              yKey: 'feedTypes.Breastfed',
              legendItemName: 'Breastfed',
              stackGroup: 'feed',
              label: {
                enabled: true,
              },
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching weekly overview data:', error);
      },
    );
  }
}
