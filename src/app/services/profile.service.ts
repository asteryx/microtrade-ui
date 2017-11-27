import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User, UserToken } from '../app.models';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Injectable()
export class ProfileService {

  pref: string = '/user/profile';

  constructor(public http: HttpClient,
              public user: User,
              public router: Router, 
              public activatedRoute: ActivatedRoute) {
  }

  private _handle(url: string, data: any){
    return this.http.post(this.pref + url, data);
  }

  get(){
    return this._handle('/get', {});
  }

  update(data: any){
    return this._handle('/update', data);
  }

}
