import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from "@angular/router";

@Injectable()
export class CommonService {
  constructor(private router?: Router) { }
  public isSessionExpired(response): void {
  	response = response && response.json();
  	if(!response.success) {
  		var code = response.code;
  		if(code === 101801 || code === 101802) {
  			// alert("You session has expired. Re-directing to Login page.");
		    localStorage.removeItem('currentUser');
		    localStorage.clear();
		    this.router.navigate(['/login']);
		    window.location.reload();
  		}
  	}
  }
}