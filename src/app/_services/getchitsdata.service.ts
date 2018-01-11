import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../config/globals';
import { CommonComponent } from '../config/common.component';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { CommonService } from './common.service';

@Injectable()
export class ChitsService {
  public serviceUrl: string = globals.dbhosturl + "api/v1/";
  public headers: any;
  public commonComponent: CommonComponent

  constructor(private http: Http, private commonService: CommonService) {
    this.commonComponent = new CommonComponent();
    this.headers = this.commonComponent.getRequestHeaders();
  }
  
  joinChit(data): Observable<boolean> {
    return this.http.post(this.serviceUrl + "saveuserchits", data, {headers: this.headers})
      .map((response: Response) => {
        if(response) {
          return true;
        } else {
          return false;
        }
      });
  }

  getChitData(): Observable<any> {
    return this.http.get(this.serviceUrl + "getuserchits", {headers: this.headers})
      .map((response: Response) => {
        let getchitgroups = response && response.json();
        if(getchitgroups && getchitgroups["data"]){
          return getchitgroups["data"];
        } else {
          return false;
        }
      });
  }

  getPopulateChitData(): Observable<any> {
    return this.http.get(this.serviceUrl + "getpopulateuserchits", {headers: this.headers})
      .map((response: Response) => {
        this.commonService.isSessionExpired(response);
        return response && response.json();
      });
  }

}
