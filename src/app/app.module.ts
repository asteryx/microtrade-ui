import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication.service'

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor, ResponseInterceptor } from './app.interceptors';

import { User, UserToken, Permissions } from "./app.models"

import {ROUTES} from "./app.routes";
import { AuthenticatedGuard } from "./app.guards"

//Libs
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './toastr.options';

// App views
import { LayoutsModule,
         ErrorsModule,
         // MainViewModule,
         // MinorViewModule,
         // LoginModule,
         LogoutModule,
         // RegisterModule,
         // ResetModule 
       } from "./components"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    // Views
    // MainViewModule,
    // MinorViewModule,
    // LoginModule,
    LogoutModule,
    // RegisterModule,
    ErrorsModule,
    // ResetModule,

    // Modules
    LayoutsModule,
    ToastModule.forRoot(),

    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {provide: ToastOptions, useClass: CustomOption},
    AuthenticatedGuard, User, UserToken, Permissions,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
