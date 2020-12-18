import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { BudgetService } from '../../service/budgetService/budget.service';
import { Budget } from '../../models/budget';
@Component({
  selector: 'pb-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  expenseForm
  categories
  selectedMonth
  formError: boolean = true
  errMsg: "Please select month and submit"
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
  budget: Budget = new Budget()
  constructor(private formBuilder: FormBuilder, private _budgetService: BudgetService, private _router: Router) {
    this.expenseForm = this.formBuilder.group({
       expenses: this.formBuilder.array([])
    });
   }
 
  ngOnInit(): void {
    // get categories
    this._budgetService.getCategories().subscribe(res => {
      this.categories = res['categories'];
      for (let item of this.categories) {
        this.expenses().push(this.newExpense(item))
    }
    }, (err) => {
      console.log(err)
    })
  }

  expenses(): FormArray {
    return this.expenseForm.get("expenses") as FormArray
  }

  newExpense(data): FormGroup {
    return this.formBuilder.group({
      category: data.categoryName,
      expense: '',
      limit: data.limit
    })
  }

  onSubmit(data): void {
    console.log(data)
    if (this.selectedMonth == "Select Month" || this.selectedMonth == undefined) {
         this.formError = true
         return
    }
    this.budget.month = this.selectedMonth
    this.budget.expenses = data.expenses
    this._budgetService.submitExpense(this.budget).subscribe((result) => {
       console.log(result);
       this._router.navigate(['/home'], { queryParams: { month: this.selectedMonth } })
    }, (err) => {
        console.log(err)
    })
  }

  monthChange(value): void {
    this.selectedMonth = value;
    this.formError = false
  }
}
