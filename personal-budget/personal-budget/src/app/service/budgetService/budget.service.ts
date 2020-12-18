import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Budget } from '../../models/budget';
import { Category } from '../../models/category';
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private configUrl = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  getCategories() {
    const token = this.getToken()
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.configUrl}/api/category`, {headers: headers});
  }

  addCategories(categories: Category[]) {
    const token = this.getToken()
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.configUrl}/api/addCategory`, categories, {headers: headers})
  }

  submitExpense(budget: Budget) {
    const token = this.getToken()
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.configUrl}/api/addExpense`, budget, {headers: headers});
  }

  getExpense(month: string) {
    const token = this.getToken()
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` };
    const options = month ? { params: new HttpParams().set('month', month) } : {};
    return this.http.get(`${this.configUrl}/api/dashboard`, { headers: headers, params: options.params });
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}
