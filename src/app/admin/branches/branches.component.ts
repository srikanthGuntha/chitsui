import { Component, OnInit } from '@angular/core';
import { BranchService } from '../_services/branches.service';

@Component({
  selector: 'app-admin-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class AdminBranchesComponent implements OnInit {

	public chitBranches:Array<Object> = [
      {id: 1, branchName: 'Madhapur'},
      {id: 2, branchName: 'Hitech City'},
      {id: 3, branchName: 'Kukatpally'},
      {id: 4, branchName: 'Banjara hills'},
  ];

  constructor(private branchService: BranchService) {}

  ngOnInit() {
  	this.branchService.getbranches()
      .subscribe(result => {
        console.log(result);
      });
  }

  private deleteBranch():any {
    // change the "1" with the object id from the response
    this.branchService.deletebranches("1")
      .subscribe(result => {
        console.log(result);
      });
  }

}
