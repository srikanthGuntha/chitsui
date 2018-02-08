import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	if (localStorage.length) {
  		if(localStorage.getItem('role') == 'agent') {
  			this.router.navigate(['/agent']);
  		} else if (localStorage.getItem('role') == 'admin') {
  			this.router.navigate(['/admin']);
  		} else if (localStorage.getItem('role') == 'user') {
  			this.router.navigate(['/user']);
  		}
  	}
  }

}
