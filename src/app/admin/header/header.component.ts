import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public btnClickLogout(): void {
  	localStorage.removeItem('currentUser');
  	this.router.navigate(['/login']);
  }

}
