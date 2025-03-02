import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
  ],
  template: `
    <div class="dashboard-container">
      <header>
        <h1>Real-time Data Dashboard</h1>
      </header>

      <div class="charts-grid">
        <div class="chart-container">
          <h2>Line Chart</h2>
          <app-line-chart></app-line-chart>
        </div>

        <div class="chart-container">
          <h2>Bar Chart</h2>
          <app-bar-chart></app-bar-chart>
        </div>

        <div class="chart-container">
          <h2>Pie Chart</h2>
          <app-pie-chart></app-pie-chart>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 20px;
      }

      header {
        margin-bottom: 20px;
      }

      h1 {
        font-size: 24px;
        color: #333;
      }

      .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;
      }

      .chart-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 15px;
      }

      h2 {
        font-size: 18px;
        margin-bottom: 15px;
        color: #555;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (environment.useSimulatedData) {
      this.dataService.simulateRealTimeData();
    }
  }
}
