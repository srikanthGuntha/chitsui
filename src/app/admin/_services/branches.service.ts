import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../../config/globals';
import { CommonComponent } from '../../config/common.component';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class BranchService{
  public serviceUrl: string = globals.dbhosturl + "api/v1/";
  public headers: any;
  public commonComponent: CommonComponent;

  constructor(private http: Http) {
    this.commonComponent = new CommonComponent();
    this.headers = this.commonComponent.getRequestHeaders();
  }

  getbranches(): Observable<any> {
    return this.http.get(this.serviceUrl + "getbranches", {headers: this.headers})
      .map((response: Response) => {
          console.log(response);
      });
  }

  savebranches(data): Observable<any> {
    return this.http.post(this.serviceUrl + "savebranches", data, {headers: this.headers})
      .map((response: Response) => {
          console.log(response);
      });
  }

  updatebranches(data): Observable<any> {
    return this.http.put(this.serviceUrl + "updatebranches", data, {headers: this.headers})
      .map((response: Response) => {
          console.log(response);
      });
  }

  deletebranches(data): Observable<any> {
    this.headers.set("x-delete-item-data", data); 
    return this.http.delete(this.serviceUrl + "deletebranches", {headers: this.headers})
      .map((response: Response) => {
          console.log(response);
      });
  }

}
