import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService, DataPoint } from '../../services/data.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="chart-wrapper">
      <canvas
        baseChart
        [data]="barChartData"
        [options]="barChartOptions"
        [type]="barChartType"
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
export class BarChartComponent implements OnInit, OnDestroy {
  private dataSubscription!: Subscription;

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Categories',
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
    labels: [],
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 300,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  public barChartType: ChartType = 'bar';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataSubscription = this.dataService.barData$.subscribe(
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
    this.barChartData.datasets[0].data = data.map((item) => item.value);
    this.barChartData.labels = data.map((item) => item.category);

    // Force chart update
    this.barChartData = { ...this.barChartData };
  }
}
