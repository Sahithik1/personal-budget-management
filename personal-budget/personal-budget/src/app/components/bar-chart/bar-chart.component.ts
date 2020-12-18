import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { BudgetService } from '../../service/budgetService/budget.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'pb-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() expenseData: any;

  chartOptions = {
    responsive: true
  }

  labels = [];

  chartData = [
    {
      label: 'Current Budget',
      data: []  // load budget values
    },
    {
      label: 'Limit',
      data: [] // load maximum budget values
    }
  ];

  colors = [
    {
      backgroundColor: 'rgb(128, 0, 0)'
    },
    {
      backgroundColor: 'rgba(0, 118, 255, 0.8)'
    }
  ]

  onChartClick(event) {
    console.log(event);
  }

  constructor(public _budgetService: BudgetService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // for (let i = 0; i < this.expenseData.expenses.length; i++) {
    //   this.chartData[0].data[i] = this.expenseData.expenses[i].expense;
    //   this.chartData[1].data[i] = this.expenseData.expenses[i].limit;
    //   this.labels[i] = this.expenseData.expenses[i].category;
    // }
}

ngOnChanges() {
  this.chartData[0].data = []
  this.chartData[1].data = []
  this.labels = []
  for (let i = 0; i < this.expenseData.expenses.length; i++) {
    this.chartData[0].data[i] = this.expenseData.expenses[i].expense;
    this.chartData[1].data[i] = this.expenseData.expenses[i].limit;
    this.labels[i] = this.expenseData.expenses[i].category;
  }
}





}