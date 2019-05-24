import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Order from '../Order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private os: OrderService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      item_name: ['', Validators.required ],
      amount: ['', Validators.required ],
      description: ['',  ]
    });
  }

  getFormPropError(propName: string) {
    return (this.formGroup.controls[propName].invalid && 
      (this.formGroup.controls[propName].dirty || this.formGroup.controls[propName].touched)) ? 
      this.formGroup.controls[propName].errors : null;
  }

  addOrder(name, amount, description) {
    const order = new Order({name, amount, description });
    this.os.addOrder(order).subscribe(() => {
      this.router.navigateByUrl('/orders');
    });
  }

  ngOnInit() {
  }

}
