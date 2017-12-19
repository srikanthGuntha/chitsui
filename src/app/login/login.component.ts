import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public istokeninfo: any;
	public username: string;
  	public password: string;
  	public error: string;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) { }

	ngOnInit() {
		this.istokeninfo = this.activatedRoute
			.queryParams
			.subscribe(params => {
				this.istokeninfo = params['istokeninfo'] || false;
			});

		if(!this.istokeninfo) {
			// user is been reidrected to login because he has no token
		}
	}

	public btnClickLogin():void {
		// this.username = "bakkupavan@gmail.com";
		// this.password = "test123";
		this.username = "admin";
		this.password = "admin";

		if(this.username && this.password) {
			this.authenticationService.login(this.username, this.password)
			.subscribe(result => {
				if(typeof result === "boolean") {
					this.error = "Username and Password are required!";
				} else {
					if(result.role === "user") {
						this.router.navigate(['/user']);
					} else if(result.role === "admin") {
						this.router.navigate(['/admin']);
					}
				}
			});
		} else {
			this.error = "Username and Password are required!";
		}

	}

}
