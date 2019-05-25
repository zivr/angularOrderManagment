import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../customer.service';
import { Customer } from '../Customer';
import { CustomerEditComponent} from '../customer-edit/customer-edit.component'


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers : Customer[];
  
  constructor(private cs: CustomerService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchCustomers();
  }

  deleteCustomer(order: Customer) {
    this.cs.deleteCustomer(order).subscribe(res => {
      this.fetchCustomers();
    })
  }

  fetchCustomers() {
    this.cs.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }
  openModal(content: any, customer: Customer) {
    const modalRef = this.modalService.open(CustomerEditComponent);
    modalRef.componentInstance.customer = customer;
  }

}
