import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  public chitsData = [
  			{"name": "1", "chitValue": "500000", "tenure": "30", "fee": "3000", "startDate": "Jan 2018", "status": true},
   			{"name": "2", "chitValue": "200000", "tenure": "20", "fee": "2000", "startDate": "Feb 2018", "status": false},
   			{"name": "3", "chitValue": "300000", "tenure": "25", "fee": "2500", "startDate": "Mar 2018", "status": true}];
  public selectedChitId: string = "";
  public selectedChitsData: any = [];
  constructor() { }

  ngOnInit() {
  }

  public onChangeChit(event) {
    if (event.name) {
    	let that = this;
    	this.chitsData.forEach(function(chit) {
    		if (chit.name == event.name) {
    			that.selectedChitsData = [];
    			that.selectedChitsData.push(chit);
    		}
    	});
    } else {
    	this.selectedChitsData = [];
    }
  }

}
