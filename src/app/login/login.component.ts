import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public istokeninfo: any;
	public user:any = {};
  	loginForm : FormGroup;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.istokeninfo = this.activatedRoute
			.queryParams
			.subscribe(params => {
				this.istokeninfo = params['istokeninfo'] || false;
			});

		if(!this.istokeninfo) {
			// user is been reidrected to login because he has no token
		}
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
	      console.log(field);
	      const control = formGroup.get(field);
	      if (control instanceof FormControl) {
	        control.markAsTouched({ onlySelf: true });
	      } else if (control instanceof FormGroup) {
	        this.validateAllFormFields(control);
	      }
	    });
	}

	public btnClickLogin():void {
		if (this.loginForm.valid) {
			this.authenticationService.login(this.user.username, this.user.password)
			.subscribe(result => {
					if (typeof (Storage) !== undefined ) {
						sessionStorage.setItem('role', result.role);
					}
					if(result.role === "user") {
						this.router.navigate(['/user']);
					} else if(result.role === "admin") {
						this.router.navigate(['/admin']);
					}
			});
		} else {
			this.validateAllFormFields(this.loginForm);
		}
	}

}
