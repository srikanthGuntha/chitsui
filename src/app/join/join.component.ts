import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
	private userdata: any;

  	constructor(private authenticationService: AuthenticationService) { }

  	ngOnInit() {
  	}

  	public btnClickRegister():void {
  		this.userdata = {
  			firstname: "Rakesh",
  			lastname: "Nagula",
  			dateofbirth: new Date("10/12/1993"),
  			email: "rockingrakesh10@gmail.com",
  			mobile: 7366332243,
  			password: "test123",
  			addressline1: "1-98 peddha veedhi",
  			addressline2: "jntu",
  			district: "rangareddy",
  			state: "Telangana",
  			idtype: "Aadhar Card",
  			idnumber: 119911991199
  		};

  		this.authenticationService.register(this.userdata)
            .subscribe(result => {
               console.log(result);
            });

  	}

}
