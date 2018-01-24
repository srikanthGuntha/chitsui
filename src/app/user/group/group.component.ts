import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../_services/getdata.service';
import { IsLoginService } from '../../_services/login.service';
import { ChitsService } from '../../_services/getchitsdata.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  public chitgroups: any[];
	public chitData:any[];

  constructor(private getdataservice: GetDataService, private isLoginService: IsLoginService, private router: Router, private chitsDataService: ChitsService) { }

  ngOnInit() {
    this.isLoginService.isLoggedIn().then((result: any) => {
      if(result.role !== 'user') {
        this.router.navigate(['/groups']);
      }
    });
    
    this.getdataservice.getchitgroups()
      .subscribe(result => {
        this.chitData = result;
      });
  }

  private joinChit(userchitid) {
    this.isLoginService.isLoggedIn().then((result: any) => {
      if (result.role && result.role == 'user') {
        this.joinChitUser({chit_id: userchitid});
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private joinChitUser(data) {
    this.chitsDataService.joinChit(data)
        .subscribe(result => {
          this.router.navigate(['/user']);
        });
  }

}
