import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../config/globals';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class GetDataService {
  public serviceUrl: string = globals.dbhosturl;

  constructor(private http: Http) {
  }

  getchitgroups(): Observable<any> {
    return this.http.get(this.serviceUrl + "getpopulatechits")
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
