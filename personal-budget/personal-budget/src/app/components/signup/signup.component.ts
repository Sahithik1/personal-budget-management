import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authService/auth.service';


@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _router: Router, public _authService:  AuthService) { }

  ngOnInit(): void {
  }

  register(user){
    console.log(user)
    this._authService.register(user).subscribe(res => {
          this._router.navigate(['/login'])
    }, (err) => {
           console.log(err);
    })
  }

}
