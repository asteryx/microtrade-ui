import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services';
import { User } from '../../app.models';


@Component({
    selector: 'logout',
    template: '',
    providers: [AuthenticationService]
})
export class logoutComponent implements OnInit {
  
  constructor(private authenticator: AuthenticationService,
              private user: User,
              private router: Router){
  }

  private logoutAndNavigate(){
    this.user.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    let result = this.authenticator.logout();

    result.subscribe(
            data => this.logoutAndNavigate(),
            err => this.logoutAndNavigate()
          );
  }

}
