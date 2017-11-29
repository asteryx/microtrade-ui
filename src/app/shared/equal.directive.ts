import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


function isEmptyInputValue(value: string) {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}

export function EqualValidator(nameString: string) {
  return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value)) {
          return null; // don't validate empty values to allow optional controls
      }

    return control.value !== control.root.get(nameString).value ? 
            { 'validateEqual': {'requiredEqual': control.root.get(nameString).value, 'actualEqual': control.value}} :
            null; 
  };
}


@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
    ]
})
export class EqualValidatorDirective implements Validator {
    constructor(
        @Attribute('validateEqual') public validateEqual: string) {

    }

    validate(control: AbstractControl): { [key: string]: any } {
        // self value
        let value = control.value;

        // else control vlaue
        let elseControl = control.root.get(this.validateEqual);

        // value not equal
        if (elseControl && elseControl.value && value !== elseControl.value) {
          return {
            validateEqual: false
          }
        }

        return null;
    }
}
