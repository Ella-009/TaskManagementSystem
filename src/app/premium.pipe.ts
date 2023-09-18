import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'premium'
})
export class PremiumPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string { 
    if (Number.isInteger(value)) {
      return "$" + value + ".00";  
    } else if (Number.isInteger(value * 10)) {
      return "$" + value + "0";  
    } else {
      return "$" + value;  
    }
  }

}
