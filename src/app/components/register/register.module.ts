import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {registerComponent} from "./register.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule,
         SpinButtonModule } from '../common'

import { MatInputModule,
         MatFormFieldModule,
         MatButtonModule} from '@angular/material';


@NgModule({
    declarations: [registerComponent],
    imports     : [ BrowserModule, RouterModule, ReactiveFormsModule,
                    SpinButtonModule, MatFormFieldModule, MatInputModule,
                    MatButtonModule, FooterModule ],
})

export class RegisterModule {}
