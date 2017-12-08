import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { ResetPasswordComponent } from "./reset-password.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule,
         SpinButtonModule } from '../common'



@NgModule({
    declarations: [ResetPasswordComponent],
    imports     : [ BrowserModule, RouterModule, ReactiveFormsModule,
                    SpinButtonModule, FooterModule],
})

export class ResetPasswordModule {}
