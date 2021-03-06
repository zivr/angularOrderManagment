import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { OrderService } from './orders/order.service';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { CustomerTypeNamePipe } from './customers/customer-type-name.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './utils/error.interceptor';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderAddComponent,
    OrderListComponent,
    OrderEditComponent,
    CustomerAddComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerTypeNamePipe,
    DashboardComponent,
    LoginComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    OrderService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    OrderEditComponent,
    CustomerEditComponent
  ],
})
export class AppModule { }
