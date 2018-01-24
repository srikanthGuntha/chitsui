import { Component, OnInit } from '@angular/core';
import { IsLoginService } from '../_services/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  constructor(private isLoginService: IsLoginService, private router: Router) { }

  ngOnInit() {
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		if(result.role !== 'user') {
  			this.router.navigate(['/howitworks']);
  		}
  	});
  }

}
