import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoaderService } from '../_services/loader.service';
import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';

import { MapErrorCodes } from '../config/errorcodes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public istokeninfo: any;
	public user:any = {};
  	loginForm : FormGroup;
  	public showLoginMsg: string = "";

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private loaderService: LoaderService) { }

	ngOnInit() {
		// this.istokeninfo = this.activatedRoute
		// 	.queryParams
		// 	.subscribe(params => {
		// 		this.istokeninfo = params['istokeninfo'] || false;
		// 	});

		// if(!this.istokeninfo) {
		// 	// user is been reidrected to login because he has no token
		// }
		this.loginForm = this.formBuilder.group({
	      username: [null, Validators.required],
	      password: [null, Validators.required]
	    });
	}

	public isFieldValid(field: string) {
	    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
	 }

  	public displayFieldCss(field: string) {
	    return {
	      'has-error': this.isFieldValid(field),
	      'has-feedback': this.isFieldValid(field)
	    };
	}

	public validateAllFormFields(formGroup: FormGroup) {
	    Object.keys(formGroup.controls).forEach(field => {
	      const control = formGroup.get(field);
	      if (control instanceof FormControl) {
	        control.markAsTouched({ onlySelf: true });
	      } else if (control instanceof FormGroup) {
	        this.validateAllFormFields(control);
	      }
	    });
	}

	public btnClickLogin():void {
		this.loaderService.display(true);
		if (this.loginForm.valid) {
			this.authenticationService.login(this.user.username, this.user.password)
			.subscribe(loggedinuser => {
				this.loaderService.display(false);

				if(loggedinuser.success) {
					let id = loggedinuser.data._id;
					let email = loggedinuser.data.email;
		            let role = loggedinuser.data.role;
		            let token = loggedinuser.data.token;
		            let fullname = loggedinuser.data.firstname + " " + loggedinuser.data.lastname;

		            localStorage.setItem('currentUser', 
		              JSON.stringify({ 
		                username: email, 
		                token: token,
		                role: role
		              }));

					if (typeof (Storage) !== undefined ) {
						localStorage.setItem('role', role);
						localStorage.setItem('id', id);
					}
					if (role === "user") {
						localStorage.setItem('firstname', fullname);
						localStorage.setItem('name', loggedinuser.data.firstname);
						localStorage.setItem('lname', loggedinuser.data.lastname);
						localStorage.setItem('email', loggedinuser.data.email);
						localStorage.setItem('mobileNumber', loggedinuser.data.mobile);
						localStorage.setItem('dob', loggedinuser.data.dob);
						localStorage.setItem('address', loggedinuser.data.address1);
						localStorage.setItem('address2', loggedinuser.data.address2);
						localStorage.setItem('city', loggedinuser.data.city);
						localStorage.setItem('state', loggedinuser.data.state);
						localStorage.setItem('pincode', loggedinuser.data.pincode);
						localStorage.setItem('IdType', loggedinuser.data.idtype);
						localStorage.setItem('idNumber', loggedinuser.data.idnumber);
						this.router.navigate(['/user']);
					} else if(role === "admin") {
						this.router.navigate(['/admin']);
					}
					else if(role === "agent") {
						localStorage.setItem('creator_role', loggedinuser.data.creator_role);
						localStorage.setItem('creator_id', loggedinuser.data._id);
						this.router.navigate(['/agent']);
					}
				} else {
					let code = loggedinuser.code;
					console.log(code);
					this.showLoginMsg = MapErrorCodes[code];
				}
			});
		} else {
			this.validateAllFormFields(this.loginForm);
			this.loaderService.display(false);
		}
	}

}
