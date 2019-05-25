import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: 'customers/create',
    component: CustomerAddComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'orders/create',
    component: OrderAddComponent
  },
  {
    path: 'orders',
    component: OrderListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
