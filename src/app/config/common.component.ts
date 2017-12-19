import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'common-component',
  template: ``,
})

export class CommonComponent implements OnInit {
	private router: Router;

	constructor(){}

	ngOnInit(){}

	public getRequestHeaders():any {
	    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	    if( currentUser && currentUser.token ) {
	    	return new Headers({
		        'x-access-token': currentUser.token
		    });
	    } else {
			this.router.navigate(['/login'], { queryParams: { istokeninfo: false } });
	    }
	}

}