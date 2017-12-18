import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
	public chitData:any[];

  constructor() { }

  ngOnInit() {
  	this.chitData = [
    	{"value": 100000, "months": 50, "subscription": 2000, "number": "SSC002"},
    	{"value": 100000, "months": 50, "subscription": 2000, "number": "SSC002"},
    	{"value": 100000, "months": 50, "subscription": 2000, "number": "SSC002"},
    	{"value": 100000, "months": 50, "subscription": 2000, "number": "SSC002"},
    	{"value": 100000, "months": 50, "subscription": 2000, "number": "SSC002"},
    	{"value": 100000, "months": 50, "subscription": 2000, "number": "SSC002"}
  	];
  }

}
