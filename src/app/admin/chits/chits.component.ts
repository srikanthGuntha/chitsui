import {TemplateRef, ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChitsService } from '../_services/chits.services';
import {Chit} from '../../models/chit.model';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BranchService } from '../_services/branches.service';

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
   selemp : Chit;
   isNewRecord : boolean;
   statusMessage:string;
   selectedBranch:number;



  constructor(private chitsService: ChitsService,private branchService: BranchService) {
     //this.chits = new Array < Chit > ();
  }

  ngOnInit() {
    this.loadChits();
    this.loadBranches();
  }

  private loadBranches(){
    this.branchService.getbranches()
      .subscribe((resp : Response) => {
        console.log(resp);
        this.branches = resp;
        this.selectedBranch = this.branches[1];

    });
  }

  private loadChits(){
    this.chitsService.getChits()
      .subscribe((resp : Response) => {
        this.chits = resp;
        console.log(resp);
    });
  }


loadTemplate(emp : Chit) {
        if (this.selemp ) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveChit() {
        if(this.isNewRecord){
            //add a new Employee
             this.chitsService.addChit(this.selemp).subscribe((resp : Response) => {

               console.log(resp);
                this.chit = resp.json(),
                this.statusMessage = 'Record Added Successfully.',
                 this.loadChits();
            });
            this.isNewRecord=false;
            this.selemp = null;
           
        }
        else{
            //edit the record
             this.chitsService.updateChit(this.selemp._id,this.selemp).subscribe((resp : Response) => {
                this.statusMessage = 'Record Updated Successfully.',
                 this.loadChits();
            });
            this.selemp = null;
            
        }
    }
    addChit(){
       this.selemp =new Chit('1','','','',''); 
        this.chits
            .push(this.selemp);
        this.isNewRecord = true;

    }

     editEmployee(chit : Chit) {
        this.selemp = chit;
    }


  deleteChit(chit:Chit){
        this.chitsService.deleteChit(chit._id).subscribe((resp : Response) => {
            this.statusMessage = 'Record Deleted Successfully.',
             this.loadChits();
        });
    }


}
