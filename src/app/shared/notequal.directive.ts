import { Directive, forwardRef, Attribute, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';


function isEmptyInputValue(value: string) {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}


export function NotEqualValidator(namesString: string) {
  return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value)) {
          return null; // don't validate empty values to allow optional controls
      }
      const namesOfControl: string[] = namesString.split(',');
      let equals: string = '';

      for (let controlName of namesOfControl){
        // value not equal
        if (control.value == control.root.get(controlName).value) {
          equals += controlName + ',';
        }
      }

    return !!equals ? 
            { 'validateNotEqual': {'requiredNotEqual': namesString, 'actualEqual': equals}} :
            null; 
  };
}


@Directive({
    selector: '[validateNotEqual][formControlName],[validateNotEqual][formControl],[validateNotEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NotEqualValidatorDirective), multi: true }
    ]
})
export class NotEqualValidatorDirective implements Validator {
  
  @Attribute('validateNotEqual')
  public validateNotEqual: string
  
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['validateNotEqual'];
    if (change) {
      this.valFn = NotEqualValidator(this.validateNotEqual);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }

}

