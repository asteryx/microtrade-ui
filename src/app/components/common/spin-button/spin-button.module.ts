import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinButtonComponent } from './spin-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpinButtonComponent],
  exports: [SpinButtonComponent]
})
export class SpinButtonModule { }
