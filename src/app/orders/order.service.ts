import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Order from './Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUri = '/api/orders';

  constructor(private http: HttpClient) { }

  addOrder(order: Order) {
    return this.http.post(`${this.baseUri}/new`, {
      name: order.name,
      amount: order.amount,
      description: order.description,
      customer: order.customer._id
    });
  }

  getOrders() {
    return this.http.get(this.baseUri);
  }

  deleteOrder(order: Order) {
    return this.http.delete(`${this.baseUri}/${order._id}`);
  }

  upateOrder(order: Order) {
    return this.http.post(`${this.baseUri}/${order._id}`, order);
  }

  getOrdersDashboard(from: Date, to: Date) {
    return this.http.get(`${this.baseUri}/countByDate/${from.getTime()}/${to.getTime()}`);
  }
}
