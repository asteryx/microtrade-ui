
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function HTMLEscapeValidator(): ValidatorFn{
  let EMAIL_REGEXP = new RegExp("[\"\'<>\/\\;\`&*#$%@]", 'i');

  return (control: AbstractControl): {[key: string]: any} => {
    const value = control.value;
    const no = EMAIL_REGEXP.test(value);
    return no ? {'HTMLEscapeValidator': {value}} : null;
  };  

  }

@Directive({
  selector: '[HTMLEscapeValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: HTMLEscapeValidatorDirective, multi: true}]
})
export class HTMLEscapeValidatorDirective implements Validator, OnChanges {
  @Input() HTMLEscapeValidator: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['HTMLEscapeValidator'];
    if (change) {
      this.valFn = HTMLEscapeValidator();
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}