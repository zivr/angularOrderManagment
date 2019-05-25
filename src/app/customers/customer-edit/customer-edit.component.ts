import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  @Input() customer: Customer;
  formGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private os: CustomerService) { 
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      item_name: ['', Validators.required ],
      type: ['' ]
    });
  }

  getFormPropError(propName: string) {
    return this.formGroup.controls[propName].invalid ? 
      this.formGroup.controls[propName].errors : null;
  }

  changeCustomer(name) {
    this.customer.name = name;
    this.os.upateCustomer(this.customer).subscribe(() => {
      this.activeModal.close();
    });
  }

  ngOnInit() {
    this.formGroup.get('item_name').setValue(this.customer.name);
    this.formGroup.get('type').setValue(this.customer.type);
  }
}
