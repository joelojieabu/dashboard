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

      <p>
        The dashboard provides real-time data visualization using WebSockets,
        ensuring continuous updates without manual refresh. It features:
      </p>

      <ul>
        <li>
          Pie Chart: Displays proportional data distribution, ideal for
          categorical insights.
        </li>
        <li>
          Bar Chart: Compares numerical values across different categories for
          trend analysis.
        </li>
        <li>
          Line Graph: Shows data trends over time, useful for monitoring
          fluctuations and patterns.
        </li>
      </ul>

      <p>
        With live updates, users can track key metrics dynamically, making
        data-driven decisions efficiently.
      </p>

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
        padding: 1rem;
        
      }

      header {
        margin-bottom: 1rem;
        font-family: 'Lato', serif;
        font-weight: 300;
        font-style: italic;
      }

      h1 {
        font-size: 1rem;
        color: #333;
      }

      .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1rem;
      }

      .chart-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
      }

      h2 {
        font-size: 1rem;
        margin-bottom: 15px;
        color: #555;
        font-family: 'Lato', serif;
        font-weight: 300;
        font-style: italic;
      }

      p,
      li {
        font-size: 0.8rem;
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
