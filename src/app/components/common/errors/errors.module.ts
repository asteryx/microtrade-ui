import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { error404Component } from "./error.404.component";
import { RouterModule } from "@angular/router";
// import { HttpClient } from '../../clients/index';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [error404Component],
    imports     : [BrowserModule, FormsModule, RouterModule],
    // providers   : [HttpClient]
})
export class ErrorsModule {}
