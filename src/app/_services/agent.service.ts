import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../config/globals';
import { CommonComponent } from '../config/common.component';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { CommonService } from './common.service';

@Injectable()
export class AgentService {
  public serviceUrl: string = globals.dbhosturl + "api/v1/";
  public headers: any;
  public commonComponent: CommonComponent

  constructor(private http: Http, private commonService: CommonService) {
    this.commonComponent = new CommonComponent();
    this.headers = this.commonComponent.getRequestHeaders();
  }
  
  getPopulateUsersData(): Observable<any> {
    return this.http.get(this.serviceUrl + "getregisters", {headers: this.headers})
      .map((response: Response) => {
        this.commonService.isSessionExpired(response);
        return response && response.json();
      });
  }

  userRegister(data): Observable<any> {
    return this.http.post(this.serviceUrl + "saveregisters", data, {headers: this.headers})
      .map((response: Response) => {
        return response && response.json();
      });
  }

  updateUser(data, id): Observable<any> {
    return this.http.put(this.serviceUrl + "updateregisters?id="+id, data, {headers: this.headers})
      .map((response: Response) => {
        return response && response.json();
      });
  }

  deleteUser(data): Observable<any> {
    return this.http.delete(this.serviceUrl + "deleteregisters?id="+data._id, {headers: this.headers})
      .map((response: Response) => {
        return response && response.json();
      });
  }

  deleteUserChits(data): Observable<any> {
    return this.http.delete(this.serviceUrl + "deleteuserchits?id="+data._id, {headers: this.headers})
      .map((response: Response) => {
        return response && response.json();
      });
  }

  addChits(data): Observable<any> {
    return this.http.post(this.serviceUrl + "saveuserchits", data, {headers: this.headers})
      .map((response: Response) => {
        return response && response.json();
      });
  }

}
