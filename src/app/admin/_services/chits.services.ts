import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Chit} from '../../models/chit.model';
import { globals } from '../../config/globals';
import { CommonComponent } from '../../config/common.component';
import {Branch} from '../../models/branch.model';
import {ChitId} from '../../models/chitid.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ChitsService {
    public serviceUrl: string = globals.dbhosturl + "api/v1/";
    public headers: any;
    public commonComponent: CommonComponent;

    constructor(private http: Http) { 
      this.commonComponent = new CommonComponent();
      this.headers = this.commonComponent.getRequestHeaders();
    }

    getChits(){
      return this.http.get(this.serviceUrl+"getpopulatechits", {headers:this.headers})
                .map((response: Response) => {
                  response = response.json();
                  return response["data"];
                })
                .catch(this._errorHandler);
    }

    addChit(chit : Chit) : Observable < Response > {
       return this
            .http
            .post(this.serviceUrl+'savechits', chit, {headers:this.headers})
    }

    updateChit(id:string,chit : Chit) : Observable < any > {
       return this.http.put(this.serviceUrl+"updatechits?id="+ chit._id, {
        branch:chit.branch,
        chitid:chit.chitid,
        chitvalue:chit.chitvalue,
        tenure:chit.tenure,
        subfee:chit.subfee
      }, {headers: this.headers})
         .map((response: Response) => {
             console.log(response);
         });
    }

  
    deleteChit(data): Observable < any >{
      return this.http.delete(this.serviceUrl+"deletechits?id="+data._id, {headers: this.headers})
      .map((response: Response) => {
          console.log(response);
          return response && response.json();
      });
    }

    _errorHandler(error:Response){
      debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}