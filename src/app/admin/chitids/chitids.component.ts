import { Component, OnInit } from '@angular/core';
import { ChitIdService } from '../_services/chitid.services';
import { BranchService } from '../_services/branches.service';
import {TemplateRef, ViewChild} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ChitId} from '../../models/chitid.model';
import {Branch} from '../../models/branch.model';

@Component({
  selector: 'app-admin-chitids',
  templateUrl: './chitids.component.html',
  styleUrls: ['./chitids.component.scss']
})
export class AdminChitidsComponent implements OnInit {

	@ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef < any >;
    @ViewChild('editTemplate')editTemplate : TemplateRef < any >;

    chitids :any;
    selectedChitId : ChitId;
    isNewRecord : boolean;
    chitid:ChitId;
    branches:any;

    branch:Branch;
    public alertClass: string = "error";
    public showChitIdsErrormsg: string = "";
    constructor(private chitIdService: ChitIdService, private branchService: BranchService) {

     this.chitids = new Array < ChitId > ();
  }

  ngOnInit() {
       this.loadChitIds();
       this.loadBranches();
  }

private loadBranches(){
    this.branchService.getbranches()
      .subscribe((resp : Response) => {
        console.log(resp);
        this.branches = resp;
    });
  }  

  loadTemplate(chitid : ChitId) {
        if (this.selectedChitId && this.selectedChitId._id == chitid._id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
         
    }

    addChitId(){
       this.selectedChitId =new ChitId('','',new Branch('','','')); 
        this.chitids
            .push(this.selectedChitId);
        this.isNewRecord = true;
    }

    branchSelected(){
        return this.selectedChitId;
    }

    cancel() {
        this.chitids.pop();
        this.selectedChitId = null;
        this.showChitIdsErrormsg="";
    }

    editChitId(chitid : ChitId) {
        this.selectedChitId = chitid;

        console.log(this.selectedChitId);
        this.selectedChitId.branch.branchid = chitid.branch._id;
    }

    saveChitId() {
      if (this.selectedChitId.chitid !== "" && this.selectedChitId.branch.branchid !== ""){
            this.showChitIdsErrormsg="";
            this.alertClass="";
            if(this.isNewRecord){
                //add a new Branch
                 this.chitIdService.addChitId(this.selectedChitId).subscribe((resp : Response) => {
                    this.chitid = resp.json(),
                    this.loadChitIds();
                    this.loadBranches();
                });
                this.isNewRecord=false;
                this.selectedChitId = null;
            }
            else{
                //edit the record
                 this.chitIdService.updateChitIds(this.selectedChitId._id,this.selectedChitId).subscribe((resp : Response) => {
                    this.loadChitIds();
                });
                this.selectedChitId = null;
                
            }

        }else{
          this.showChitIdsErrormsg="Please fill all fileds";
          this.alertClass="error";
        }
    }

    deleteChitIds(chitid : ChitId) {
       this.chitIdService.deleteChitIds(chitid)
         .subscribe(result => {
           console.log(result);
           this.loadChitIds();
         });
     }

     

  private loadChitIds(){
     this.chitIdService.getchitids()
      .subscribe((resp : Response) => {
        console.log(resp);
        this.chitids = resp;
    });
  }

}
