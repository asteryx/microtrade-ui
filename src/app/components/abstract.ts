import { Component, AfterViewChecked, ViewChild, ViewContainerRef, HostListener } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { FormGroup, NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


function update(obj: any, obj2:any): any{
  for (let i=1; i<arguments.length; i++) {
    for (let prop in arguments[i]) {
        let val = arguments[i][prop];
        if (typeof val == "object") // this also applies to arrays or null!
            update(obj[prop], val);
        else
            obj[prop] = val;
    }
  }
    return obj;
}


export class AbstractComponent {

  constructor(public toastr:ToastsManager,
              public vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }
  public errorCodes: any;

  public handleServerError(resp: any) {
    let errCode = resp['code'] || 0;

    if (resp.status == 401 || errCode){

      return
    }
    if (resp.status == 0){
      this.toastr.error('Error connecting to server');
      return
    }
      
    let errors = this.commonErrors();
    update(errors, this.getErrors())
    const codeError: number = this.getErrorCode(resp)
    const errorString: any = errors[codeError]

    if (errorString){
      this.toastr.error(errorString);
      return
    }
    
    if (codeError){
      // this.toastr.error(`Error code ${codeError}`);
      console.log(`Error code ${codeError}`);
    }
    else{
      this.toastr.error('Error connecting to server');
    }
  }

  protected getErrorCode(resp: any): number{
    const result: any = resp.error || {}
    return result['error'] || 0
  }

  protected commonErrors(){
    return {
      1: 'Field is required',
      2: 'Field cannot be null',
      3: 'Field cannot be blank',
      4: 'Field is invalid',
      5: 'Field contains too many characters',
      6: 'Field contains less characters than it is needed',
      7: 'Field contains greater value than it is needed',
      8: 'Field contains less value than it is needed',
      9: 'Field contains value too large (number decoded to string)',
      10: 'The total number of digits in the field is greater than allowed',
      11: 'The decimal places of digits in the field is greater than allowed',
      12: 'The digits before the decimal point in the field is greater than allowed',
      13: 'Expected a datetime but got a date',
      14: 'Invalid datetime for the used timezone',
      15: 'Expected a date but got a datetime',
      16: 'Field contains is not a valid choice',
      17: 'Field contains is not a list of items',
      18: 'Field may not be empty'
    }
  }

  public getErrors(){
    return update({}, this.errorCodes)
  }
  
  
}
