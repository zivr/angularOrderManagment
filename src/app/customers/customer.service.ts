import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUri = '/api/customers';

  constructor(private http: HttpClient) { }

  addCustomer(customer: Customer) {
    return this.http.post(`${this.baseUri}/new`, {
      name: customer.name,
      type: customer.type
    });
  }

  getCustomers() {
    return this.http.get(this.baseUri);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(`${this.baseUri}/${customer._id}`);
  }

  upateCustomer(customer: Customer) {
    return this.http.post(`${this.baseUri}/${customer._id}`, customer);
  }
}
