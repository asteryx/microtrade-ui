import { Injectable } from '@angular/core';



@Injectable()
export class UserToken {
  
  private tokenName: string = 'access_token';

  get token(){
    return localStorage.getItem(this.tokenName) || '';
  }
  
  set token(token:string){
    localStorage.setItem(this.tokenName, token);
  }
  
  remove(){
    localStorage.removeItem(this.tokenName);
  }
}

@Injectable()
export class Permissions {

}

@Injectable()
export class User {
  public email: string = '';
  public first_name: string = '';
  public last_name: string = '';
  public password: string = '';
  public confirm_password: string = '';

  constructor(private uToken:UserToken, private permission: Permissions) {
    // code...
  }

  login(token: string){
    this.uToken.token = token;
  }

  logout(){
    localStorage.clear();
  }

  isLoggedIn(){
    if (!!this.uToken.token){
      return true;
    }else{
      return false;
    }
  }

}
