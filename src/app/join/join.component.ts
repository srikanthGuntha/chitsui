import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  registrationForm : FormGroup;
  
  public user:any = {};
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: [null, Validators.required],
      dob: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      lname: [null, Validators.required],
      email: [null, [Validators.required]],
      address: [null, Validators.required],
      idNumber: [null, Validators.required],
      IdType: [null, Validators.required]
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

  submitForm() {
    console.log(this.registrationForm);
    if (this.registrationForm.valid) {
      console.log('form submitted');
      console.log(this.user);
      this.authenticationService.register(this.user)
             .subscribe(result => {
                console.log(result);
            });
    } else {
      this.validateAllFormFields(this.registrationForm);
      console.log(this.user);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
