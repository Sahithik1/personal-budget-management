import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetService } from '../../service/budgetService/budget.service'
@Component({
  selector: 'pb-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  isEmpty: boolean;
  tableDataSrc: any;
  tableCols: string[] = ['categoryName', 'limit']
  tableData: any
  constructor(private _budgetService: BudgetService) { }

  ngOnInit(): void {
    this._budgetService.getCategories().subscribe((res) => {
      if (res == null) {
        this.isEmpty = true
      } else {
        this.isEmpty = false
        // console.log(res)
        this.tableData = res['categories']
        // console.log(this.tableData)
        this.tableDataSrc = new MatTableDataSource(this.tableData);
      }
    }, (err) => {
      console.log(err)
    })
  }

}
