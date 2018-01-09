import { Component, OnInit } from '@angular/core';
import { IsLoginService } from "../../_services/login.service";
import { GetDataService } from "../../_services/getdata.service";
import { ChitsService } from "../../_services/getchitsdata.service";
import { LoaderService } from '../../_services/loader.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.scss']
})
export class UserChitsComponent implements OnInit {
  public chitsData: any[] = [];

  constructor(private isLoginService: IsLoginService, private router: Router, private getdataservice: GetDataService, private chitsdataservice: ChitsService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.display(true);
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		if(result.role !== 'user') {
  			this.router.navigate(['/login']);
  		}
  	});

    this.chitsdataservice.getPopulateChitData().subscribe(result => {
        if (result.length) {
          this.loaderService.display(false);
          this.chitsData = result;
        } else {
          this.loaderService.display(false);
          this.chitsData = [];
        }
      });

	}
}
