import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export const triggerControlValidators = (control: AbstractControl) => {
  control.markAsTouched();
  control.markAsDirty();
  if((control instanceof FormGroup || control instanceof FormArray) && control.controls) {
    Object.values(control.controls).map((innerControl) => triggerControlValidators(innerControl));
  }
}