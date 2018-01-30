import {Component, Input, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { IsLoginService } from "../../_services/login.service";
import { LoaderService } from '../../_services/loader.service';
import { AgentService } from '../../_services/agent.service';
import { GetDataService } from '../../_services/getdata.service';
import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { MapErrorCodes } from '../../config/errorcodes';
import { Router } from "@angular/router";

@Component({
  selector: 'app-agent-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.scss']
})
export class AgentChitsComponent implements OnInit {

  public chitsData: any[] = [];
  public userData: any[] = [];
  public noActiveShits:boolean = false;
  manageToolsets: EventEmitter<Event> = new EventEmitter<Event>();
  chitsForm : FormGroup;
  public chits:any = {};
  public alertClass: string = "error";
  public showUserChitsMsg: string = "";

  constructor(private isLoginService: IsLoginService, private router: Router, private loaderService: LoaderService, private agentService: AgentService, private formBuilder: FormBuilder, private getdataservice: GetDataService) {
  }

  ngOnInit() {
  	this.loaderService.display(true);
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		this.loaderService.display(false);
  		if(result.role !== 'agent') {
  			this.router.navigate(['/groups']);
  		}
  	});
    this.chitsForm = this.formBuilder.group({
      chitId: [null, Validators.required],
      user: [null, Validators.required]
    });

    this.getdataservice.getchitgroups()
      .subscribe(result => {
        this.chitsData = result;
      });

    this.agentService.getPopulateUsersData().subscribe(result => {
      this.loaderService.display(true);
      if (result.success) {
        this.userData = result.data;
        this.loaderService.display(false);
      } else {
        this.userData = [];
        this.loaderService.display(false);
        var code = result.code;
        console.log(MapErrorCodes[code] || "Something went wrong, please try again.");
      }
    });
  }

  createChits(e: Event) {
    this.manageToolsets.emit(new Event("open"));
  }

  onToolsetsSelected(result : {
    action: string,
    initiator: Event
  }) {
    this.chits = {};
    this.showUserChitsMsg = "";
    this.resetForm(this.chitsForm);
  }

  isFieldValid(field: string) {
    return !this.chitsForm.get(field).valid && this.chitsForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  submitForm() {
    this.validateAllFormFields(this.chitsForm);
    if (this.chitsForm.valid) {
      this.loaderService.display(true);
      this.agentService.addChits(this.chits)
         .subscribe(result => {
            if(result.success) {
              this.loaderService.display(false);
              this.alertClass = "success";
              this.showUserChitsMsg = "User successfull added";
              this.chits = {};
              this.resetForm(this.chitsForm);
            } else {
              this.loaderService.display(false);
              let code = result.code;
              this.alertClass = "error";
              this.showUserChitsMsg = MapErrorCodes[code];
            }
        });
    } else {
      this.validateAllFormFields(this.chitsForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  resetForm(formGroup: FormGroup) {
    let control = null;
    formGroup.reset();
    formGroup.markAsUntouched();
      Object.keys(formGroup.controls).forEach((name) => {
        if (control instanceof FormControl) {
          control = formGroup.controls[name];
          control.setErrors(null);
      }
    });
  }

}
