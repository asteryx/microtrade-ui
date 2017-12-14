import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {TopnavbarComponent} from "./topnavbar.component";

@NgModule({
    declarations: [TopnavbarComponent],
    imports     : [BrowserModule, RouterModule],
    exports     : [TopnavbarComponent],
})

export class TopnavbarModule {}
