import { Component, OnInit } from '@angular/core';
import { IsLoginService } from "../../_services/login.service";
import { GetDataService } from "../../_services/getdata.service";
import { ChitsService } from "../../_services/getchitsdata.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.scss']
})
export class UserChitsComponent implements OnInit {
  public chitsData: any[] = [];

  constructor(private isLoginService: IsLoginService, private router: Router, private getdataservice: GetDataService, private chitsdataservice: ChitsService) { }

  ngOnInit() {
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		if(result.role !== 'user') {
  			this.router.navigate(['/login']);
  		}
  	});

  	// this.chitsdataservice.getChitData().subscribe(result => {
   //    	console.log(result);
   //   });

    this.chitsdataservice.getPopulateChitData().subscribe(result => {
        if (result.length) {
          this.chitsData = result;
        } else {
          this.chitsData = [];
        }
      });

	}
}
