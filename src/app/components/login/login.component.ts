import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { AbstractComponent } from '../abstract'
import { AuthenticationService } from '../../services';
import { User } from '../../app.models';

import 'rxjs/add/operator/finally';

@Component({
    selector: 'login',
    templateUrl: 'login.template.html'
})
export class loginComponent  extends AbstractComponent implements OnInit {

  constructor(public toastr:ToastsManager,
              public vcr: ViewContainerRef,
              public auth: AuthenticationService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public user: User){
    super(toastr, vcr);
  }

  loading: boolean = false;
  loginForm: FormGroup;
  public errorCodes: any = {
    201:  "Unable to log in with provided credentials",
    202:  "User account is disabled"
  }

  ngOnInit() {
    this.loginForm = this.getForm()
  }
  
  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    this.loading = true;
    this.auth.login(value)
      .finally(() => this.loading = false)
      .subscribe(
        res => this.login(res['token']),
        err => this.handleServerError(err))
  }

  login(token: string): void{
    if(token){
      this.user.login(token);
      
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        let to = params['returnUrl'] || '/';
        this.router.navigate([to]);
      });
    }else{
      this.toastr.info(this.errorRetrieveData);
    }
  }

  getForm():FormGroup{
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(150)      
        ]),
      password: new FormControl('', [
        Validators.required
        ])
    });
  }
}
