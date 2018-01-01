import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Chit} from '../../models/chit.model';
import { CommonComponent } from '../../config/common.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ChitsService {
      baseUrl: string = 'http://localhost:33699/api/customer/';
    public headers: any;
    public commonComponent: CommonComponent;

    constructor(private http: Http) { 
      this.commonComponent = new CommonComponent();
      this.headers = this.commonComponent.getRequestHeaders();
      console.log(this.headers);
    }

    getChits(){
      return this.http.get("https://chitservices.herokuapp.com/getchitgroups", {headers:this.headers})
                .map((response: Response) => {
                  response = response.json();
                  return response["data"];
                })
                .catch(this._errorHandler);
    }

    addChit(chit : Chit) : Observable < Response > {
       return this
            .http
            .post('https://chitservices.herokuapp.com/api/v1/savec', chit, {headers:this.headers})
    }

    updateChit(id:string,chit : Chit) : Observable < Response > {
        
       return this
            .http
            .put('https://chitservices.herokuapp.com/api/v1/savechits'+`/`+id, JSON.stringify(chit))
    }

  
    deleteChit(_id:string): Observable < Response >{

        return this
            .http
            .delete("https://chitservices.herokuapp.com/api/v1/deletechits"+`/`+_id)
    }

    

    _errorHandler(error:Response){
      debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}