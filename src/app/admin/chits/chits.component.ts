import {TemplateRef, ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChitsService } from '../_services/chits.services';
import {Chit} from '../../models/chit.model';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BranchService } from '../_services/branches.service';
import { ChitIdService } from '../_services/chitid.services';

import 'rxjs/Rx';

@Component({
  selector: 'app-admin-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.scss']
})
export class AdminChitsComponent implements OnInit {

  @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef < any >;
    @ViewChild('editTemplate')editTemplate : TemplateRef < any >;

   chit : Chit;
   chits : any;
   branches : any;
   selectedChit : Chit;
   isNewRecord : boolean;
   statusMessage:string;
   chitids :any;




  constructor(private chitsService: ChitsService,private branchService: BranchService, private chitIdService: ChitIdService) {
     this.chits = new Array < Chit > ();
  }

  ngOnInit() {
    this.loadChits();
    this.loadBranches();
    this.loadChitIds();
  }

  private loadBranches(){
    this.branchService.getbranches()
      .subscribe((resp : Response) => {
        console.log(resp);
        this.branches = resp;
        //this.selectedBranch = this.branches[1];

    });
  }
  private loadChitIds(){
    this.chitIdService.getchitids()
      .subscribe((resp : Response) => {
        console.log(resp);
        this.chitids = resp;
    });
  }

  private loadChits(){
    this.chitsService.getChits()
      .subscribe((resp : Response) => {
        this.chits = resp;
        console.log(resp);
    });
  }


loadTemplate(chit : Chit) {
        if (this.selectedChit && this.selectedChit._id == chit._id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveChit() {
        if(this.isNewRecord){
            //add a new Employee
             this.chitsService.addChit(this.selectedChit).subscribe((resp : Response) => {
                this.chit = resp.json(),
                this.statusMessage = 'Record Added Successfully.',
                 this.loadChits();
                 this.loadBranches();
                 this.loadChitIds();
            });
            this.isNewRecord=false;
            this.selectedChit = null;
           
        }
        else{
            //edit the record
             this.chitsService.updateChit(this.selectedChit._id,this.selectedChit).subscribe((resp : Response) => {
                this.statusMessage = 'Record Updated Successfully.',
                 this.loadChits();
                 this.loadBranches();
                 this.loadChitIds();
            });
            this.selectedChit = null;
            
        }
    }
    addChit(){
       this.selectedChit =new Chit('','','','','',''); 
        this.chits
            .push(this.selectedChit);
        this.isNewRecord = true;

    }

    editChit(chit : Chit) {
        this.selectedChit = chit;
    }


  deleteChit(chit:Chit){
        this.chitsService.deleteChit(chit).subscribe((resp : Response) => {
            this.statusMessage = 'Record Deleted Successfully.',
             this.loadChits();
        });
    }


}
