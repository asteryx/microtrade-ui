import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { ResetPasswordComponent } from "./reset-password.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule,
         SpinButtonModule } from '../common'

import { MatInputModule,
         MatFormFieldModule,
         MatButtonModule} from '@angular/material';


@NgModule({
    declarations: [ResetPasswordComponent],
    imports     : [ BrowserModule, RouterModule, ReactiveFormsModule,
                    SpinButtonModule, MatFormFieldModule, MatInputModule,
                    MatButtonModule, FooterModule ],
})

export class ResetPasswordModule {}
