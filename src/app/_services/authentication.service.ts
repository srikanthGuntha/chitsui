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
        // if(loggedinuser.success) {
        //     let token = loggedinuser.data.token;
        //     let role = loggedinuser.data.role;
        //     let id = loggedinuser.data._id;

        //     localStorage.setItem('currentUser', 
        //       JSON.stringify({ 
        //         username: loggedinuser.data.email, 
        //         token: loggedinuser.data.token 
        //       }));

        //     return {
        //       role: role,
        //       id: id
        //     };
        // } else {
        //   var code = loggedinuser.code;
        //   console.log(code);
        // }

        // if(loggedinuser && loggedinuser["data"]){
        //   let token = loggedinuser.data.token;
        //   if(token) {
        //     localStorage.setItem('currentUser', 
        //       JSON.stringify({ 
        //         username: loggedinuser.data.email, 
        //         token: loggedinuser.data.token 
        //       }));
        //     let role = loggedinuser.data.role;
        //     let id = loggedinuser.data._id;
        //     return {
        //       role: role,
        //       id: id
        //     };
        //   } else {
        //     return false;
        //   }
        // } else {
        //   return false;
        // }
      });
  }

  register(data): Observable<any> {
    return this.http.post(this.serviceUrl + "register", data)
      .map((response: Response) => {
        return response && response.json();
        // if(userdata["data"]) {
        //   return true;
        // } else {
        //   return false;
        // }
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  sessionTimeOut(): void {
    alert("You session has expired. Re-directing to Login page.");
    this.logout();
  }
}
