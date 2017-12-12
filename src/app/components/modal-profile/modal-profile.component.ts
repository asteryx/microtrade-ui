import { Component, OnInit, ViewChild, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { TimerObservable } from "rxjs/observable/TimerObservable";

import { loginComponent } from '../login/login.component';

import { AbstractComponent } from '../abstract';
import { ModalComponent } from '../common/modal/modal.component';
import { UserMessage } from '../../app.models';

import { ProfileService, MessagingService } from '../../services';


interface Profile{
  email: string;
  first_name: string;
  last_name: string;
}


@Component({
  selector: 'modal-profile',
  templateUrl: 'modal-profile.html'
})
export class ModalProfileComponent extends AbstractComponent {

  constructor(public profileService: ProfileService,
              public router: Router,
              public toastr:ToastsManager,
              public vcr: ViewContainerRef,
              public msgService: MessagingService){
    super(toastr, vcr);
  }
  
  // profile: Profile = new Profile;
  loading: boolean = false;
  profileForm: FormGroup;

  @ViewChild('modalProfile')
  modalProfile: ModalComponent;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.profileForm = this.getForm();
  }

  open() {
    // this.profile.load();
    // this.profile.reset();
    this.modalProfile.open();
  }

  editOK(name:string, field: any){
    
    const data: any = {};
    data[name] = field.tempValue;
    
    if (field.edit && field.value !== field.tempValue){
      this.loading = true;
      this.profileService.update(data)
        .finally(() => this.loading = false)
        .subscribe(() => {
          field.edit = !field.edit;
          field.value = field.tempValue;
          
          // this.profile.save();

          if(name == 'email'){
            this.msgService.publish(new UserMessage("Your E-mail has been successfully changed", loginComponent))
              TimerObservable.create(1000).subscribe(() => {
              if(this.router.url !== '/login'){
                this.router.navigate(['/logout']);
              }            
            });
          }
        },
        err => this.handleServerError(err),
        () => this.changed.emit());
    }else{
      field.edit = !field.edit;
    }
  }
  getForm(){
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(150)        
        ]),
      first_name: new FormControl('', [Validators.maxLength(30)]),
      last_name: new FormControl('', [Validators.maxLength(30)]),
    });
  }

  onSubmit({ value, valid }: { value: Profile, valid: boolean }) {
    this.loading = true;
    this.profileService.update(value)
      .finally(() => this.loading = false)
      .subscribe(
        res => this.modalProfile.close(),
        err => this.handleServerError(err))
  }
}
