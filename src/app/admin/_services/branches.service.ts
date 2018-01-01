import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { globals } from '../../config/globals';
import { CommonComponent } from '../../config/common.component';
import { Observable } from 'rxjs';
import {Branch} from '../../models/branch.model';
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
      return this.http.get(this.serviceUrl+ "getbranches", {headers: this.headers})
      .map((response: Response) => {
        console.log(response);
         response = response.json();
         return response["data"];
      });
   }

   addBranch(branch : Branch) : Observable < Response > {
      return this
            .http
            .post(this.serviceUrl+'savebranches', {branchname:branch.branchname}, {headers:this.headers})
   }

   updatebranches(id:string,branch : Branch): Observable<any> {
      return this.http.put(this.serviceUrl+"updatebranches?id="+ branch._id, branch, {headers: this.headers})
         .map((response: Response) => {
             console.log(response);
         });
   }

   deletebranches(data): Observable<any> {
      return this.http.delete(this.serviceUrl+"deletebranches?id="+data._id, {headers: this.headers})
      .map((response: Response) => {
          console.log(response);
      });
   }

}
