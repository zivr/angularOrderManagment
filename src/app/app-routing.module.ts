import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
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
