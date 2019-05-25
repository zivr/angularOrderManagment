import { Customer } from '../customers/Customer';

export default class Order {
    _id:any;
    name: String;
    amount: Number;
    description: String;
    customer: Customer;

    public constructor(init?:Partial<Order>) {
        Object.assign(this, init);
    }
  }