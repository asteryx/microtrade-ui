import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import {loginComponent} from "./login.component";
import { FooterModule, } from "../common";
import { SpinButtonModule } from '../common'
import { MatInputModule,
         MatFormFieldModule,
         MatButtonModule} from '@angular/material';

@NgModule({
    declarations: [loginComponent],
    imports     : [BrowserModule, RouterModule, ReactiveFormsModule,
                   FooterModule, SpinButtonModule, MatInputModule,
                   MatFormFieldModule, MatButtonModule],
})

export class LoginModule {}
