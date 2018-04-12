import { FormControl, FormGroup } from "@angular/forms";

export function pinValidator(control: FormControl): { [key: string]: any } {
    var pin = control.value != undefined ? control.value : '';
    if (!pin.match(/^[0-9]+$/)) {
      return { minNumber: true };
    }
  }
  
export function userIdValidator(control: FormControl): { [key: string]: any } {
    var id = control.value != undefined ? control.value : '';
    if (!id.match(/^[0-9]+$/)) {
      return { idNumber: true };
    }
  }