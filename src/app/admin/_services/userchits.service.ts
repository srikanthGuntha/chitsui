import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {UserChit} from '../../models/userchit.model';
import { globals } from '../../config/globals';
import { CommonComponent } from '../../config/common.component';
import {Branch} from '../../models/branch.model';
import {ChitId} from '../../models/chitid.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserChitsService {
    public serviceUrl: string = globals.dbhosturl + "api/v1/";
    public headers: any;
    public commonComponent: CommonComponent;

    constructor(private http: Http) { 
      this.commonComponent = new CommonComponent();
      this.headers = this.commonComponent.getRequestHeaders();
    }

    getUserChits(){
      return this.http.get(this.serviceUrl+"getpopulateuserchits", {headers:this.headers})
                .map((response: Response) => {
                  response = response.json();
                  return response["data"];
                })
                .catch(this._errorHandler);
    }

    updateUserChit(id:string,chit : UserChit) : Observable < any > {
       return this.http.put(this.serviceUrl+"updateuserchits?id="+ chit._id, {
        chitstatus:chit.chitstatus
      }, {headers: this.headers})
         .map((response: Response) => {
             console.log(response);
         });
    }

  
    _errorHandler(error:Response){
      debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}