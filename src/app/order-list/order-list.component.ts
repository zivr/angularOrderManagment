import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Order from '../Order'
import { OrderEditComponent} from '../order-edit/order-edit.component'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders : Order[];
  
  constructor(private os: OrderService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchOrders();
  }

  deleteOrder(order: Order) {
    this.os.deleteOrder(order).subscribe(res => {
      this.fetchOrders();
    })
  }

  fetchOrders() {
    this.os.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }
  openModal(content: any, order: Order) {
    const modalRef = this.modalService.open(OrderEditComponent);
    modalRef.componentInstance.order = order;
  }
}
