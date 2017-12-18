import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Chit } from './chit';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ChitsService {

  // private heroesUrl = 'api/heroes';

  

  constructor(private http: Http) { }

  // getChits () {
  //   return [
  //     {
  //       "id": "",
        
  //     },
  //     {
  //       "id": ""
  //     }
  //   ]
  // }

 
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  // /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   //this.messageService.add('HeroService: ' + message);
  // }


 

}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/