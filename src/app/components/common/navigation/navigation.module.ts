import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {NavigationComponent} from "./navigation.component";
import { ModalProfileModule } from "../../modal-profile/modal-profile.module";


@NgModule({
    declarations: [NavigationComponent],
    imports     : [BrowserModule, RouterModule, ModalProfileModule],
    exports     : [NavigationComponent],
})

export class NavigationModule {}
