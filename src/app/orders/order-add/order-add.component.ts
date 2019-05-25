import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Order from '../Order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../customers/customer.service';
import { Customer } from '../../customers/Customer';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {

  formGroup: FormGroup;
  customers: Customer[] = [];

  constructor(private fb: FormBuilder, private os: OrderService, private router: Router, private cs: CustomerService) {
    this.createForm();
    this.fetchCustomers();
  }

  createForm() {
    this.formGroup = this.fb.group({
      customer_name: ['', Validators.required],
      item_name: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['',]
    });
  }

  getFormPropError(propName: string) {
    return (this.formGroup.controls[propName].invalid &&
      (this.formGroup.controls[propName].dirty || this.formGroup.controls[propName].touched)) ?
      this.formGroup.controls[propName].errors : null;
  }

  addOrder(name, amount, description, customerName) {
    const customer = this.customers.find(c => c.name === customerName);
    const order = new Order({ name, amount, description, customer });
    this.os.addOrder(order).subscribe(() => {
      this.router.navigateByUrl('/orders');
    });
  }

  fetchCustomers() {
    this.cs.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  ngOnInit() {
  }

  searchCustomerByName = (text$: Observable<string>) => {
    const filteredCustomers = (term) => this.customers.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
      .slice(0, 10)
      .map(c => c.name);
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] : filteredCustomers(term))
    )
  }
}
