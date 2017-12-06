import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../../services';
import { AbstractComponent } from '../abstract';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends AbstractComponent implements OnInit {

  constructor(public toastr:ToastsManager,
              public vcr: ViewContainerRef,
              public auth: AuthenticationService,
              public router: Router) { 
    super(toastr, vcr);
  }
  
  loading: boolean = false;
  resetForm: FormGroup;

  ngOnInit() {
    this.resetForm = this.getForm()
  }

  getForm():FormGroup{
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(150)      
        ])
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.loading = true;
    this.auth.resetPassword(value)
      .finally(() => this.loading = false)
      .subscribe(
        res => this.reset(),
        err => this.handleServerError(err))
  }

  reset(){
    this.router.navigate(['/login']);
  }
}
