import {TemplateRef, ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ChitsService } from '../_services/chits.services';
import {UserChit} from '../../models/userchit.model';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BranchService } from '../_services/branches.service';
import { ChitIdService } from '../_services/chitid.services';
import { UserChitsService } from '../_services/userchits.service';


import 'rxjs/Rx';

@Component({
  selector: 'app-admin-userchits',
  templateUrl: './userchits.component.html',
  styleUrls: ['./userchits.component.scss']
})
export class UserChitsComponent implements OnInit {

  @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef < any >;
    @ViewChild('editTemplate')editTemplate : TemplateRef < any >;

   userChit : UserChit;
   userChits : any;
   selectedUserChit : UserChit;
   statusMessage:string;

  constructor(private userChitsService: UserChitsService) {
     this.userChits = new Array < UserChit > ();
  }

  ngOnInit() {
    this.loadUserChits();
  }

  private loadUserChits(){
    this.userChitsService.getUserChits()
      .subscribe((resp : Response) => {
        this.userChits = resp;
    });
  }


loadTemplate(chit : UserChit) {
        if (this.selectedUserChit && this.selectedUserChit._id == chit._id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    updateUserChit() {
             this.userChitsService.updateUserChit(this.selectedUserChit._id,this.selectedUserChit).subscribe((resp : Response) => {
                this.statusMessage = 'Record Updated Successfully.',
                 this.loadUserChits();
            });
            this.selectedUserChit = null;
           
    }

    editChit(chit : UserChit) {
        this.selectedUserChit = chit;
        this.selectedUserChit.chitstatus = chit.chitstatus;
    }

    cancel() {
        this.selectedUserChit = null;
    }

}
