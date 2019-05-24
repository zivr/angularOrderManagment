import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

const routes: Routes = [
  {
    path: 'orders/create',
    component: OrderAddComponent
  },
  {
    path: 'orders/edit/:id',
    component: OrderEditComponent
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
