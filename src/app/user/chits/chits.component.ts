import { Component, OnInit } from '@angular/core';
import { IsLoginService } from "../../_services/login.service";
import { GetDataService } from "../../_services/getdata.service";
import { ChitsService } from "../../_services/getchitsdata.service";
import { LoaderService } from '../../_services/loader.service';
import { Router } from "@angular/router";

import { MapErrorCodes } from '../../config/errorcodes';

@Component({
  selector: 'app-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.scss']
})
export class UserChitsComponent implements OnInit {
  public chitsData: any[] = [];
  public showNoChitsText:string = "";
  public noActiveChits:boolean = false;

  constructor(private isLoginService: IsLoginService, private router: Router, private getdataservice: GetDataService, private chitsdataservice: ChitsService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.display(true);
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		if(result.role !== 'user') {
  			this.router.navigate(['/login']);
  		}
  	});

    this.chitsdataservice.getPopulateChitData().subscribe(result => {
      if (result.success) {
        this.loaderService.display(false);
        this.chitsData = result.data;
        this.noActiveChits = false;
        if (!this.chitsData.length) {
          this.noActiveChits = true;
          this.showNoChitsText = "You have no chits added. Please add here.";
        }
      } else {
        this.loaderService.display(false);
        this.noActiveChits = true;
        this.showNoChitsText = "You have no chits added. Please add here.";
        this.chitsData = [];
        var code = result.code;
        console.log(MapErrorCodes[code] || "Something went wrong, please try again.");
      }
    });
	}
}
