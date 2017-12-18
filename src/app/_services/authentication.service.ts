import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../config/globals';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public serviceUrl: string = globals.dbhosturl;
  public token: string;
  public currentUser: any;

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.serviceUrl + "login", { email: username, password: password })
      .map((response: Response) => {
        let loggedinuser = response && response.json();
        if(loggedinuser && loggedinuser["data"]){
          let token = loggedinuser.data.token;
          if(token) {
            localStorage.setItem('currentUser', 
              JSON.stringify({ 
                username: loggedinuser.data.email, 
                token: loggedinuser.data.token 
              }));
            let role = loggedinuser.data.role;
            return {
              role: role
            };
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  }

  register(data): Observable<boolean> {
    return this.http.post(this.serviceUrl + "register", data)
      .map((response: Response) => {
        let userdata = response && response.json();
        if(userdata["data"]) {
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
