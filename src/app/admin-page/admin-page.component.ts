import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-page/login.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
  }
}
