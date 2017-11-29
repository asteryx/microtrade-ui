import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';


import { HTMLEscapeValidatorDirective } from './htmlescape.directive';
import { EqualValidatorDirective } from './equal.directive';
import { NotEqualValidatorDirective } from './notequal.directive';


@NgModule({
  imports:      [ CommonModule],
  declarations: [ HTMLEscapeValidatorDirective,
                  EqualValidatorDirective, NotEqualValidatorDirective ],
  exports:      [ HTMLEscapeValidatorDirective,
                  EqualValidatorDirective, NotEqualValidatorDirective, CommonModule ]
})
export class SharedModule { }

