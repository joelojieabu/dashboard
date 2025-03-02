import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService, DataPoint } from '../../services/data.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="chart-wrapper">
      <canvas
        baseChart
        [data]="pieChartData"
        [options]="pieChartOptions"
        [type]="pieChartType"
      >
      </canvas>
    </div>
  `,
  styles: [
    `
      .chart-wrapper {
        height: 300px;
      }
    `,
  ],
})
export class PieChartComponent implements OnInit, OnDestroy {
  private dataSubscription!: Subscription;

  public pieChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
    labels: [],
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 300,
    },
    plugins: {
      legend: { position: 'right' },
    },
  };

  public pieChartType: ChartType = 'pie';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataSubscription = this.dataService.pieData$.subscribe(
      (data: DataPoint[]) => {
        this.updateChart(data);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  private updateChart(data: DataPoint[]): void {
    this.pieChartData.datasets[0].data = data.map((item) => item.value);
    this.pieChartData.labels = data.map((item) => item.category);

    // Force chart update
    this.pieChartData = { ...this.pieChartData };
  }
}
