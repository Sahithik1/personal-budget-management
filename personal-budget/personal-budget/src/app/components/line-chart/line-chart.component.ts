import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { BudgetService } from '../../service/budgetService/budget.service';
// import { DataService } from '../data.service';

@Component({
  selector: 'pb-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements AfterViewInit {
  @Input() expenseData: any;
  chartCreated: boolean;
  myPieChart: any;
  public dataSource = {
    datasets: [
      {
        label: 'Original Budget',
        data: [],
        fill: false,
        lineTension: 0.2,
        borderColor: "red",
        borderWidth: 1
      },
      {
        label: 'Limit',
        data: [],
        fill: false,
        lineTension: 0.2,
        borderColor: "black",
        borderWidth: 1
      },
    ],
    labels: [],
    options: { events: [] }
  };

  constructor( private _budgetService: BudgetService ) { }

  ngAfterViewInit(): void {
      for (let i = 0; i < this.expenseData.expenses.length; i++) {
        this.dataSource.datasets[0].data[i] = this.expenseData.expenses[i].expense;
        this.dataSource.datasets[1].data[i] = this.expenseData.expenses[i].limit;
        this.dataSource.labels[i] = this.expenseData.expenses[i].category;
      }
      this.createChart();
  }

  ngOnChanges() {
    this.dataSource.datasets[0].data = []
    this.dataSource.datasets[1].data = []
    this.dataSource.labels = []
    for (let i = 0; i < this.expenseData.expenses.length; i++) {
      this.dataSource.datasets[0].data[i] = this.expenseData.expenses[i].expense;
      this.dataSource.datasets[1].data[i] = this.expenseData.expenses[i].limit;
      this.dataSource.labels[i] = this.expenseData.expenses[i].category;
    }
    this.updateChart()
  }

  // tslint:disable-next-line: typedef
  createChart() {
    let ctx = (document.getElementById('line') as HTMLCanvasElement).getContext('2d');
    this.myPieChart = new Chart(ctx, {
      type: 'line',
      data: this.dataSource
    });
  }

  updateChart() {
    this.myPieChart.update()
  }
}

