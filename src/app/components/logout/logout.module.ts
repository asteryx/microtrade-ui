import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { logoutComponent } from "./logout.component";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [logoutComponent],
    imports     : [BrowserModule, RouterModule]
})

export class LogoutModule {}
