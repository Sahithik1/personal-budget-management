import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { BudgetService } from '../../service/budgetService/budget.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  productForm: FormGroup;
  addCategories: Category[] = []

  constructor(private fb: FormBuilder, public _budgetService: BudgetService, private _router: Router) {
    this.productForm = this.fb.group({
      categories: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this._budgetService.getCategories().subscribe(res => {
      if (res != null) console.log(res);
    }, (err) => {
      console.log(err)
    })
  }

  categories(): FormArray {
    return this.productForm.get("categories") as FormArray
  }

  newCategory(): FormGroup {
    return this.fb.group({
      categoryName: '',
      limit: '',
    })
  }

  addCategory() {
    this.categories().push(this.newCategory());
  }

  removeCategory(i: number) {
    this.categories().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.addCategories = this.productForm.value
    console.log(this.addCategories)
    this._budgetService.addCategories(this.addCategories).subscribe((res) => {
          this._router.navigate(['/categories'])    
        console.log(res)

    }, (err) => {
         console.log(err)
    })
  }
}
