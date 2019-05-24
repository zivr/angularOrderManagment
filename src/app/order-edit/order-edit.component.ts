import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Order from '../Order';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  @Input() order: Order;
  formGroup: FormGroup;
  test = 'test'

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private os: OrderService) { 
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
    return this.formGroup.controls[propName].invalid ? 
      this.formGroup.controls[propName].errors : null;
  }

  changeOrder(name, amount, description) {
    this.order.name = name;
    this.order.amount = amount;
    this.order.description = description;
    this.os.upateOrder(this.order).subscribe(() => {
      this.activeModal.close();
    });
  }

  ngOnInit() {
    this.formGroup.get('item_name').setValue(this.order.name);
    this.formGroup.get('amount').setValue(this.order.amount);
    this.formGroup.get('description').setValue(this.order.description);
  }

}
