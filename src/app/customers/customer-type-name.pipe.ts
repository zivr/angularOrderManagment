import { Pipe, PipeTransform } from '@angular/core';
import { CustomerType } from './Customer';

@Pipe({
  name: 'customerTypeName'
})
export class CustomerTypeNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return CustomerType[value];
  }

}
