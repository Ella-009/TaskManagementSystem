import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[passwordMatch]', 
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }]
})
export class PasswordMatchDirective implements Validator{

  @Input('passwordMatch') passwordControlName: string = "";

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const confirmPassword = control.root.get(this.passwordControlName)?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

}
