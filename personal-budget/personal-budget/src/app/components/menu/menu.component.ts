import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authService/auth.service';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loggedIn: boolean = false
  constructor(private router: Router ,private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getUserLoggedIn().subscribe(value => {
      this.loggedIn = value;
    })
    }

  logoutUser() {
    this._authService.logout()
    this.router.navigate(['/login'])
  }
  }
