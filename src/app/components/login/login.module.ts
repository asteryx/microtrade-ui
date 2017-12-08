import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import {loginComponent} from "./login.component";
import { FooterModule, } from "../common";
import { SpinButtonModule } from '../common'


@NgModule({
    declarations: [loginComponent],
    imports     : [BrowserModule, RouterModule, ReactiveFormsModule,
                   FooterModule, SpinButtonModule],
})

export class LoginModule {}
