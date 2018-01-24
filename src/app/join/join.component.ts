import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { MapErrorCodes } from '../config/errorcodes';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  registrationForm : FormGroup;
  public alertClass: string = "error";
  public showRegistraionMsg: string = "";
  
  public user:any = {};
    constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: [null, Validators.required],
      lname: [null, Validators.required],
      email: [null, [Validators.required]],
      mobileNumber: [null, Validators.required],
      password: [null, Validators.required],
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
    return !this.registrationForm.get(field).valid && this.registrationForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  ifEmailExists(data: string) {
    this.authenticationService.isEmailExisting(data)
    .subscribe(result => {
            if(result.code == "200201") {
              this.alertClass = "error";
              this.showRegistraionMsg = "Email already exists. Please login now.";
            }
        });
  }

  ifMobileExists(data: string) {
    this.authenticationService.isMobileExisting(data)
    .subscribe(result => {
            if(result.code == "200201") {
              this.alertClass = "error";
              this.showRegistraionMsg = "Mobile number already exists. Please login now.";
            }
        });
  }

  submitForm() {
    if (this.registrationForm.valid) {
      this.authenticationService.register(this.user)
         .subscribe(result => {
            if(result.success) {
              this.alertClass = "success";
              this.showRegistraionMsg = "Your registration was successfull. Please login now.";
              this.user = {};
              this.resetForm(this.registrationForm);
            } else {
              let code = result.code;
              this.alertClass = "error";
              this.showRegistraionMsg = MapErrorCodes[code];
            }
        });
    } else {
      this.validateAllFormFields(this.registrationForm);
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
