import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { MapErrorCodes } from '../config/errorcodes';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm : FormGroup;
  public alertClass: string = "error";
  public showContactMsg: string = "";

  public user:any = {};
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      comments: [null, Validators.required]
    });
  }

  isFieldValid(field: string) {
    return !this.contactForm.get(field).valid && this.contactForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  submitForm() {
    if (this.contactForm.valid) {
      // this.authenticationService.register(this.user)
      //    .subscribe(result => {
      //       if(result.success) {
      //         this.alertClass = "success";
      //         this.showContactMsg = "Your registration was successfull. Please login now.";
      //       } else {
      //         let code = result.code;
      //         this.alertClass = "error";
      //         this.showContactMsg = MapErrorCodes[code];
      //       }
      //   });
    } else {
      this.validateAllFormFields(this.contactForm);
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
