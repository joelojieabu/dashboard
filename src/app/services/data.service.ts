import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';

export interface DataPoint {
  timestamp: number;
  value: number;
  category?: string;
}

export interface ChartData {
  lineData: DataPoint[];
  barData: DataPoint[];
  pieData: DataPoint[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket$: WebSocketSubject<any>;
  private chartData: ChartData = {
    lineData: [],
    barData: [],
    pieData: [],
  };

  private lineDataSubject = new BehaviorSubject<DataPoint[]>([]);
  private barDataSubject = new BehaviorSubject<DataPoint[]>([]);
  private pieDataSubject = new BehaviorSubject<DataPoint[]>([]);

  lineData$ = this.lineDataSubject.asObservable();
  barData$ = this.barDataSubject.asObservable();
  pieData$ = this.pieDataSubject.asObservable();

  constructor() {
    this.socket$ = webSocket(environment.webSocketUrl);
    this.initWebSocket();
  }

  private initWebSocket(): void {
    this.connectToWebSocket();
  }

  private handleSocketData(data: any): void {
    // Handle different types of data based on the message type
    if (data.type === 'lineData') {
      this.updateLineData(data.value);
    } else if (data.type === 'barData') {
      this.updateBarData(data.value);
    } else if (data.type === 'pieData') {
      this.updatePieData(data.value);
    }
  }

  private updateLineData(newData: DataPoint): void {
    // Keep only the last 20 data points for the line chart
    if (this.chartData.lineData.length >= 20) {
      this.chartData.lineData.shift();
    }
    this.chartData.lineData.push(newData);
    this.lineDataSubject.next([...this.chartData.lineData]);
  }

  private updateBarData(newData: DataPoint): void {
    // Update or add new bar data
    const existingIndex = this.chartData.barData.findIndex(
      (item) => item.category === newData.category
    );

    if (existingIndex !== -1) {
      this.chartData.barData[existingIndex] = newData;
    } else {
      this.chartData.barData.push(newData);
    }

    this.barDataSubject.next([...this.chartData.barData]);
  }

  private updatePieData(newData: DataPoint): void {
    // Update or add new pie data
    const existingIndex = this.chartData.pieData.findIndex(
      (item) => item.category === newData.category
    );

    if (existingIndex !== -1) {
      this.chartData.pieData[existingIndex] = newData;
    } else {
      this.chartData.pieData.push(newData);
    }

    this.pieDataSubject.next([...this.chartData.pieData]);
  }

  // Method to simulate WebSocket data for development/testing
  simulateRealTimeData(): void {
    setInterval(() => {
      // Simulate line chart data
      this.updateLineData({
        timestamp: Date.now(),
        value: Math.floor(Math.random() * 100),
      });

      // Simulate bar chart data
      const categories = [
        'Category A',
        'Category B',
        'Category C',
        'Category D',
      ];
      this.updateBarData({
        timestamp: Date.now(),
        value: Math.floor(Math.random() * 100),
        category: categories[Math.floor(Math.random() * categories.length)],
      });

      // Simulate pie chart data
      const pieCategories = [
        'Segment 1',
        'Segment 2',
        'Segment 3',
        'Segment 4',
      ];
      this.updatePieData({
        timestamp: Date.now(),
        value: Math.floor(Math.random() * 100),
        category:
          pieCategories[Math.floor(Math.random() * pieCategories.length)],
      });
    }, 1500);
  }

  private connectToWebSocket(): void {
    console.log('Connecting to WebSocket...');
    this.socket$ = webSocket(environment.webSocketUrl);

    this.socket$.subscribe(
      (data) => this.handleSocketData(data),
      (error) => {
        console.error('WebSocket error:', error);
        // Try to reconnect after a delay
        setTimeout(() => this.connectToWebSocket(), 3000);
      },
      () => {
        console.log('WebSocket connection closed');
        // Try to reconnect after a delay
        setTimeout(() => this.connectToWebSocket(), 3000);
      }
    );
  }
}
