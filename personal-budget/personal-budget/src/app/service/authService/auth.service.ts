import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tokens } from '../../models/token';
@Injectable()
export class AuthService {

  Tokens: Observable<any>;
  loggedIn = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post('http://localhost:5000/user/register', user);
  }

  login(user): Observable<tokens> {
    return this.http.post<tokens>('http://localhost:5000/user/login', user);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.setUserLoggedIn(false);
  }

  setUserLoggedIn(value: boolean) {
    this.loggedIn.next(value)
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }
}
