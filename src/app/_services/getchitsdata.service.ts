import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../config/globals';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ChitsService {
  public serviceUrl: string = globals.dbhosturl;

  constructor(private http: Http) {
  }
  
  joinChit(data): Observable<boolean> {
    return this.http.post(this.serviceUrl + "savechit", data)
      .map((response: Response) => {
        let userdata = response && response.json();
        if(userdata["data"]) {
          return true;
        } else {
          return false;
        }
      });
  }

  getChitData(): Observable<any> {
    return this.http.get(this.serviceUrl + "userchit")
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
