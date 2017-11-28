import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import { SpinButtonComponent } from './spin-button.component';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatProgressSpinnerModule
  ],
  declarations: [SpinButtonComponent],
  exports: [SpinButtonComponent]
})
export class SpinButtonModule { }
