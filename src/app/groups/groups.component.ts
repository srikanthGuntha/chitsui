import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../_services/getdata.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  public chitgroups: any[];
	public chitData:any[];

  constructor(private getdataservice:GetDataService) { }

  ngOnInit() {
    this.getdataservice.getchitgroups()
      .subscribe(result => {
        console.log(result);
        this.chitData = result;
      });
  }
}
