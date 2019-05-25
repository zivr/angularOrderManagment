export enum CustomerType { Admin = 0, Customer = 1}
export class Customer {
    _id:any;

    public constructor(public name:String, public type:CustomerType) {
    }
  }