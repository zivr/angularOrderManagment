export default class Order {
    _id:any;
    name: String;
    amount: Number;
    description: String;

    public constructor(init?:Partial<Order>) {
        Object.assign(this, init);
    }
  }