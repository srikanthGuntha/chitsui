import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { IsLoginService } from "../../_services/login.service";

import { MapErrorCodes } from '../../config/errorcodes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm : FormGroup;
  public alertClass: string = "error";
  public showUpdateMsg: string = "";
  
  public user:any = {};
    constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private isLoginService: IsLoginService) {
  }

  ngOnInit() {
    this.isLoginService.isLoggedIn().then((result: any) => {
      if(result.role == 'user') {
        this.user.firstName = result.name;
        this.user.lastName = result.lname;
        this.user.email = result.email;
        this.user.mobileNumber = result.mobileNumber;
        this.user.dob = result.dob.substring(0, 10);
        this.user.address = result.address;
        this.user.address2 = result.address2;
        this.user.city = result.city;
        this.user.state = result.state;
        this.user.pincode = result.pincode;
        this.user.IdType = result.IdType;
        this.user.IdNumber = result.idNumber;
      }
    });
    this.profileForm = this.formBuilder.group({
      name: [null, Validators.required],
      lname: [null, Validators.required],
      email: [null, [Validators.required]],
      mobileNumber: [null, Validators.required],
      dob: [null, Validators.required],
      address: [null, Validators.required],
      address2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      pincode: [null, Validators.required],
      IdType: [null, Validators.required],
      idNumber: [null, Validators.required]
    });
  }


  isFieldValid(field: string) {
    return !this.profileForm.get(field).valid && this.profileForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  submitForm() {
    if (this.profileForm.valid) {
      // this.authenticationService.register(this.user)
      //    .subscribe(result => {
      //       if(result.success) {
      //         this.alertClass = "success";
      //         this.showUpdateMsg = "Your Updation was successfull. Please login now to see updated profile.";
      //       } else {
      //         let code = result.code;
      //         this.alertClass = "error";
      //         this.showUpdateMsg = MapErrorCodes[code];
      //       }
      //   });
    } else {
      this.validateAllFormFields(this.profileForm);
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

}
