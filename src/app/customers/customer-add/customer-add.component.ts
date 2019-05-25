import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Customer, CustomerType } from '../Customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  get types() {
    return Object.keys(CustomerType).filter(value => typeof CustomerType[value] !== 'string') as string[];
  }
  

  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private os: CustomerService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      item_name: ['', Validators.required ]
    });
  }

  getFormPropError(propName: string) {
    return (this.formGroup.controls[propName].invalid && 
      (this.formGroup.controls[propName].dirty || this.formGroup.controls[propName].touched)) ? 
      this.formGroup.controls[propName].errors : null;
  }

  addCustomer(name, type: string) {
    const customer = new Customer(name, CustomerType[type]);
    this.os.addCustomer(customer).subscribe(() => {
      this.router.navigateByUrl('/customers');
    });
  }

  ngOnInit() {
  }

}
