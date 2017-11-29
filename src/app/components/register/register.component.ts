import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User, UserToken } from '../../app.models';
import { EqualValidator, NotEqualValidator } from '../../shared';
import { AuthenticationService } from '../../services';
import { AbstractComponent } from '../abstract';

declare var countries: any;


@Component({
    selector: 'register',
    templateUrl: 'register.template.html'
})
export class registerComponent extends AbstractComponent implements OnInit {
  
  constructor(public toastr:ToastsManager,
              public vcr: ViewContainerRef,
              public auth: AuthenticationService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public user: User){
    super(toastr, vcr);
  }
  
  loading: boolean = false;
  registerForm: FormGroup;
  errorCodes = {
    101: "User with this email is already exists",
    102: "The password did not pass the complexity check or invalid",
    103: "Device id contains invalid characters"
  }

  ngOnInit() {
    this.registerForm = this.getForm()
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    this.loading = true;
    this.auth.register(value)
      .finally(() => this.loading = false)
      .subscribe(
        res => this.login(res['token']),
        err => this.handleServerError(err))
  }
  
  login(token: string): void{
    this.user.login(token);
    
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let to = params['returnUrl'] || '/';
      this.router.navigate([to]);
    });
  }

  get countryList(){
    return countries;
  }

  getForm(){
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(150)        
        ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        Validators.pattern(/[^0-9]/),
        NotEqualValidator('email,first_name,last_name')
        ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        Validators.pattern(/[^0-9]/),
        EqualValidator('password')
        ]),
      first_name: new FormControl('', [Validators.maxLength(30)]),
      last_name: new FormControl('', [Validators.maxLength(30)]),
    });
  }

  keyUpPassword(){
    this.registerForm.controls['password2'].setValue(this.registerForm.controls['password2'].value);
  }


}
