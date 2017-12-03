import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {NavigationComponent} from "./navigation.component";
import {MatSidenavModule,
        MatListModule,
        MatIconModule} from "@angular/material";


@NgModule({
    declarations: [NavigationComponent],
    imports     : [BrowserModule, RouterModule, MatSidenavModule,
                   MatListModule, MatIconModule],
    exports     : [NavigationComponent],
})

export class NavigationModule {}
