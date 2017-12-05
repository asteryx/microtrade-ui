import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User, UserToken } from '../app.models';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Injectable()
export class AuthenticationService {

  constructor(public http: HttpClient,
              public user: User) {
  }
  
  private prefix: string = '/api/v1'
  private post (url: string, data:any){
    return this.http.post(`${ this.prefix }${ url }`, data);
  }

  private getRandSuffics(){

    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

  }

  login(user: User) {    
    return this.post('/auth/login', JSON.stringify(user));
  }

  logout() {
    return this.post('/auth/logout', JSON.stringify({}));
  }

  register(user: User){
    return this.post('/auth/register', JSON.stringify(user));
  }

  resetPassword(user:User){
    let data = {
      "email": user.email
    }
    return this.post('/auth/password/reset', JSON.stringify(data));
  }

  recoveryPasswordConfirm(data: any){
    return this.post('/auth/password/confirm', JSON.stringify(data));
  }

  changePassword(data: any){
    return this.post('/auth/password/change', data);
  }
}

