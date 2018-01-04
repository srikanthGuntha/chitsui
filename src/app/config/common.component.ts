import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'common-component',
  template: ``,
})

export class CommonComponent implements OnInit {

	constructor(){}

	ngOnInit(){}

	public getRequestHeaders():any {
	    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	    if( currentUser && currentUser.token ) {
	    	let headers = new Headers();
	    	headers.set('x-access-token', currentUser.token);
	    	return headers;
	    } else {
	    	return false;
			// this.router.navigate(['/login'], { queryParams: { istokeninfo: false } });
	    }
	}

}