import { Component, OnInit } from '@angular/core';
import { IsLoginService } from "../../_services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.scss']
})
export class AdminChitsComponent implements OnInit {

  constructor(private isLoginService: IsLoginService, private router: Router) { }

  ngOnInit() {
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		if(result.role !== 'admin') {
  			this.router.navigate(['/login']);
  		}
  	});
  }
}
