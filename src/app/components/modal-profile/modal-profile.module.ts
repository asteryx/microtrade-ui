import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";

import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from "../common/modal/modal.module";
import { ModalProfileComponent } from './modal-profile.component';
import { SpinButtonModule } from '../common/spin-button/spin-button.module';


@NgModule({
    declarations: [ModalProfileComponent],
    imports     : [BrowserModule, RouterModule, ReactiveFormsModule,
                   SharedModule, ModalModule, SpinButtonModule],
    exports     : [ModalProfileComponent]
})

export class ModalProfileModule {}
