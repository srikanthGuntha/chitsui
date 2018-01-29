import {TemplateRef, ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { IsLoginService } from "../../_services/login.service";
import { LoaderService } from '../../_services/loader.service';
import { Router } from "@angular/router";

import 'rxjs/Rx';

@Component({
  selector: 'app-agent-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.scss']
})
export class AgentChitsComponent implements OnInit {

  constructor(private isLoginService: IsLoginService, private router: Router, private loaderService: LoaderService) {
  }

  ngOnInit() {
  	this.loaderService.display(true);
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		this.loaderService.display(false);
  		if(result.role !== 'agent') {
  			this.router.navigate(['/login']);
  		}
  	});
  }

}
