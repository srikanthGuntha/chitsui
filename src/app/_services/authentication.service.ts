import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../config/globals';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public serviceUrl: string = globals.dbhosturl;
  public token: string;
  public currentUser: any;

  constructor(private http?: Http, private router?: Router) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.serviceUrl + "login", { email: username, password: password })
      .map((response: Response) => {
        return response && response.json();
      });
  }

  register(data): Observable<any> {
    return this.http.post(this.serviceUrl + "register", data)
      .map((response: Response) => {
        return response && response.json();
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  sessionTimeOut(): void {
    alert("You session has expired. Re-directing to Login page.");
    this.logout();
  }

  isMobileExisting(data): Observable<any> {
    return this.http.post(this.serviceUrl + "ismobileexists", data)
      .map((response: Response) => {
        return response && response.json();
    });
  }

  isEmailExisting(data): Observable<any> {
    return this.http.post(this.serviceUrl + "isemailexists", data)
      .map((response: Response) => {
        return response && response.json();
    });
  }
  
}
