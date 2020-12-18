import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../service/dataService/data.service';
import { BudgetService } from '../../service/budgetService/budget.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public lineChartData: any;
  private pieColors = []
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: []
      },
      {
        data: [],
        backgroundColor: []
      }
    ],
    labels: [],
    options: { events: [] }
  };
  errMsg: string = "No data, please add categories and expenses to display graphs"
  showError: boolean = true
  selectedMonth: string
  months = [
    "Select Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sepetember",
    "October",
    "November",
    "December"]

  constructor(public dataService: DataService, public _budgetService: BudgetService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.route.queryParams.subscribe(params => {
         if (params != null) {
          this.monthChange(params['month'])
         }
     })
  }
  ngAfterViewInit(): void {
  }

  monthChange(value) {
    this.selectedMonth = value;
    this._budgetService.getExpense(this.selectedMonth)
      .subscribe((res: any) => {
        if (res == null) {
          this.showError = true
        } else {
          this.showError = false
          this.lineChartData = res;
          this.dataSource.datasets[0].data = []
          this.dataSource.datasets[0].backgroundColor = []
          this.dataSource.datasets[1].data = []
          this.dataSource.datasets[1].backgroundColor = []
          this.dataSource.labels = []
          for (let i = 0; i < res.expenses.length; i++) {
            this.dataSource.datasets[0].data[i] = res.expenses[i].expense;
            this.dataSource.datasets[1].data[i] = res.expenses[i].limit;
            this.dataSource.labels[i] = res.expenses[i].category;
            this.pieColors.push(this.dynamicColors())
          }
          this.dataSource.datasets[0].backgroundColor = this.pieColors
          this.dataSource.datasets[1].backgroundColor = this.pieColors
          this.createChart();
        }
      });
  }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  // tslint:disable-next-line: typedef
  createChart() {
    // let ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
    // const myPieChart = new Chart(ctx, {
    //   type: 'pie',
    //   data: this.dataSource
    // });
  }
}
