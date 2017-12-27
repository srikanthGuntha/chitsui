import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../config/globals';
import { CommonComponent } from '../config/common.component';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ChitsService {
  public serviceUrl: string = globals.dbhosturl + "api/v1/";
  public headers: any;
  public commonComponent: CommonComponent

  constructor(private http: Http) {
    this.commonComponent = new CommonComponent();
    this.headers = this.commonComponent.getRequestHeaders();
  }
  
  joinChit(data): Observable<boolean> {
    return this.http.post(this.serviceUrl + "savemanagementchits", data, {headers: this.headers})
      .map((response: Response) => {
        if(response) {
          return true;
        } else {
          return false;
        }
      });
  }

  getChitData(): Observable<any> {
    return this.http.get(this.serviceUrl + "getmanagementchits", {headers: this.headers})
      .map((response: Response) => {
        let getchitgroups = response && response.json();
        if(getchitgroups && getchitgroups["data"]){
          return getchitgroups["data"];
        } else {
          return false;
        }
      });
  }
}
