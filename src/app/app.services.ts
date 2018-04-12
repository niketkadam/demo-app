
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, ResponseContentType, RequestOptions, BrowserXhr } from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { validateConfig } from '@angular/router/src/config';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

    constructor(private http: Http){

    }
    getContracts(){
        return this.http.get('assets/json/barrels.json').map(response => response.json())
        .catch(this.handleStatusErrors);
    }
    getTanks(){
        return this.http.get('assets/json/barrels.json').map(response => response.json())
        .catch(this.handleStatusErrors);
    }
    
  handleStatusErrors(err: Response) {
    return Observable.throw(err);
  }
}