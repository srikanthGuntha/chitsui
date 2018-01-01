import { Component, OnInit } from '@angular/core';
import { BranchService } from '../_services/branches.service';
import {TemplateRef, ViewChild} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Branch} from '../../models/branch.model';

@Component({
  selector: 'app-admin-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class AdminBranchesComponent implements OnInit {


   @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef < any >;
    @ViewChild('editTemplate')editTemplate : TemplateRef < any >;

    branches :any;
    selectedBranch : Branch;
    isNewRecord : boolean;
    branch:Branch;

  constructor(private branchService: BranchService) {

     this.branches = new Array < Branch > ();
  }

  ngOnInit() {
       this.loadBranches();
  }

  loadTemplate(branch : Branch) {
     console.log(this.selectedBranch);
        if (this.selectedBranch && this.selectedBranch._id == branch._id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
         
    }

    addBranch(){
       this.selectedBranch =new Branch('',''); 
        this.branches
            .push(this.selectedBranch);
        this.isNewRecord = true;

    }

    branchSelected(){
        return this.selectedBranch;
    }

    cancel() {
        this.branches.pop();
        this.selectedBranch = null;
    }

    editBranch(branch : Branch) {
        this.selectedBranch = branch;
    }

    saveBranch() {
        if(this.isNewRecord){
            //add a new Branch
             this.branchService.addBranch(this.selectedBranch).subscribe((resp : Response) => {
                this.branch = resp.json(),
                 this.loadBranches();
            });
            this.isNewRecord=false;
            this.selectedBranch = null;
        }
        else{
            //edit the record
             this.branchService.updatebranches(this.selectedBranch._id,this.selectedBranch).subscribe((resp : Response) => {
                 this.loadBranches();
            });
            this.selectedBranch = null;
            
        }
    }

    deleteBranch(branch:Branch) {
       this.branchService.deletebranches(branch)
         .subscribe(result => {
           console.log(result);
            this.loadBranches();
         });
     }

     

  private loadBranches(){
     this.branchService.getbranches()
      .subscribe((resp : Response) => {
        console.log(resp);
        this.branches = resp;
    });
  }

  // private deleteBranch():any {
  //   // change the "1" with the object id from the response
  //   this.branchService.deletebranches("1")
  //     .subscribe(result => {
  //       console.log(result);
  //     });
  // }

}
