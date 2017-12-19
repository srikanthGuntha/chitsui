import { Component, OnInit } from '@angular/core';


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

  constructor() { 
  	// this.chitsService.getChits().subscribe(response =>{
  	// 	console.log(response);
  	// })
  }

  ngOnInit() {
  	//this.getChits();
  }

  // getChits(): void {
  // 	console.log("getChits",this.chitsService.getChits());

  //   this.chitsService.getChits();
  // }

}
