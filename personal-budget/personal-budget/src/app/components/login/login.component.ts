import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../service/dataService/data.service';
import { AuthService } from '../../service/authService/auth.service'
import { tokens } from '../../models/token';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: tokens;
  constructor(private router: Router, public _dataService: DataService, public _authService: AuthService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('Login Successfull!', 'Toastr fun!');
  }

  logIn(user) {
    this._authService.login(user).subscribe(res => {
      // console.log(res)
      this.token = res;
      if (this.token.accessToken != null || this.token.accessToken != undefined) {
        localStorage.setItem('accessToken', this.token.accessToken);
        localStorage.setItem('refreshToken', this.token.refreshToken);
        this._authService.setUserLoggedIn(true);
        this.showSuccess()
        this.router.navigate(['/home']);
      }
      else {
        window.alert('incorrect login details');
      }
    }, (err) => {
      console.log(err);
      window.alert('incorrect login details');
    }
    )
  }
}