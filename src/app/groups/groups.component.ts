import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../_services/getdata.service';
import { AuthenticationService } from '../_services/authentication.service';
import { IsLoginService } from "../_services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  public chitgroups: any[];
	public chitData:any[];

  constructor(private getdataservice:GetDataService, private authenticationService: AuthenticationService, private isLoginService: IsLoginService, private router: Router) { }

  ngOnInit() {
    this.getdataservice.getchitgroups()
      .subscribe(result => {
        this.chitData = result;
      });
  }

  private joinChit(chitId) {
    this.isLoginService.isLoggedIn().then((result: any) => {
      if (result.role && result.role == 'user') {
        this.joinChitUser({id: result.id, chitId: chitId});
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private joinChitUser(data) {
    this.authenticationService.joinChit(data)
        .subscribe(result => {
          this.router.navigate(['/user']);
        });
  }
}
