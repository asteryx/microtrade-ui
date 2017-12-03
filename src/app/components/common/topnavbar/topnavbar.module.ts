import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {MatToolbarModule,
        MatButtonModule,
        MatIconModule} from '@angular/material';
import {TopnavbarComponent} from "./topnavbar.component";

@NgModule({
    declarations: [TopnavbarComponent],
    imports     : [BrowserModule, RouterModule,
                   MatToolbarModule, MatButtonModule,
                   MatIconModule],
    exports     : [TopnavbarComponent],
})

export class TopnavbarModule {}
