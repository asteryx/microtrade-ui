import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {registerComponent} from "./register.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule,
         SpinButtonModule } from '../common'



@NgModule({
    declarations: [registerComponent],
    imports     : [ BrowserModule, RouterModule, ReactiveFormsModule,
                    SpinButtonModule, FooterModule],
})

export class RegisterModule {}
