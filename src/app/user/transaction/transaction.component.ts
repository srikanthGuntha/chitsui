import { Component, OnInit } from '@angular/core';
import { ChitsService } from "../../_services/getchitsdata.service";
import { LoaderService } from '../../_services/loader.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  public chitsData: any = [];
  public selectedChitId: string = "";
  public showNoTransactionsText: string = "";
  public selectedChitsData: any = [];
  constructor(private authService: AuthenticationService,private chitsdataservice: ChitsService, private loaderService: LoaderService) { }
  ngOnInit() {
    this.loaderService.display(true);
    this.chitsdataservice.getPopulateChitData().subscribe(result => {
        if (result.length) {
          this.loaderService.display(false);
          let that = this;
          result.forEach(function(data){
            if (data.chitstatus) {
              that.chitsData.push(data);
            }
          });
          if (!this.chitsData.length) {
            this.showNoTransactionsText = "All Your Chits are in Progress.";
          }
        } else {
          this.loaderService.display(false);
          this.chitsData = [];
          this.showNoTransactionsText = "Error in fetching your chits data.";
        }
      });
  }

  public onChangeChit(event) {
    if (event.chit.chitid.chitid) {
    	let that = this;
    	this.chitsData.forEach(function(chit) {
    		if (chit.chit.chitid.chitid == event.chit.chitid.chitid) {
    			that.selectedChitsData = [];
    			that.selectedChitsData.push(chit);
    		}
    	});
    } else {
    	this.selectedChitsData = [];
    }
  }

}
