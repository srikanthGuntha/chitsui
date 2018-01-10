import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../../config/globals';
import { CommonComponent } from '../../config/common.component';
import { Observable } from 'rxjs';
import {Branch} from '../../models/branch.model';
import {ChitId} from '../../models/chitid.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ChitIdService{
  public serviceUrl: string = globals.dbhosturl + "api/v1/";
  public headers: any;
  public commonComponent: CommonComponent;

  constructor(private http: Http) {
    this.commonComponent = new CommonComponent();
    this.headers = this.commonComponent.getRequestHeaders();
  }

   getchitids(): Observable<any> {
      return this.http.get(this.serviceUrl+ "getpopulate", {headers: this.headers})
      .map((response: Response) => {
        console.log(response);
         response = response.json();
         return response["data"];
      });
   }

   addChitId(chitId : ChitId) : Observable < Response > {
      return this
            .http
            .post(this.serviceUrl+'savechitids', {
              chitid:chitId.chitid,
              branch : chitId.branch.branchid
            }, {headers:this.headers})
   }

   updateChitIds(id:string,chitId : ChitId): Observable<any> {
      return this.http.put(this.serviceUrl+"updatechitids?id="+ chitId._id, {
        branch:chitId.branch.branchid,
        chitid:chitId.chitid
      }, {headers: this.headers})
         .map((response: Response) => {
             console.log(response);
         });
   }

   deleteChitIds(data): Observable<any> {
      return this.http.delete(this.serviceUrl+"deletechitids?id="+data._id, {headers: this.headers})
      .map((response: Response) => {
          console.log(response);
      });
   }

}
