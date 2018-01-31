import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IsLoginService } from "../../_services/login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public name: string = "";
  constructor(private router: Router, private isLoginService: IsLoginService) { }

  ngOnInit() {
    this.isLoginService.isLoggedIn().then((result: any) => {
      if(result.role == 'user') {
        this.name = result.firstname;
      }
    });
  }

  public btnClickLogout(): void {
  	localStorage.removeItem('currentUser');
  	localStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload();
  }

}
