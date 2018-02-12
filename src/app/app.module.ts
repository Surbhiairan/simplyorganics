import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerColumnComponent } from './customer-list/customer-column.component';
import { CustomerDatatableComponent } from './customer-list/customer-datatable.component';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductColumnComponent } from './product-list/product.column.component';
import { ProductDatatableComponent } from './product-list/product.datatable.component';

import { SalespersonListComponent } from './salesperson-list/salesperson-list.component';
import { SalespersonEditComponent } from './salesperson-edit/salesperson-edit.component';
import { SalespersonColumnComponent } from './salesperson-list/salesperson.column.component';
import { SalespersonDatatableComponent } from './salesperson-list/salesperson.datatable.component';
import { SalespersonDetailComponent } from './salesperson-detail/salesperson-detail.component';

import { StoreViewComponent } from './store-view/store-view.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreColumnComponent} from './store-view/store.column.component';
import { StoreDatatableComponent} from './store-view/store.datatable.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';


import { MeasureService } from './measure.service';
import { MessageService } from './message.service';
import { CurrencyService } from './currency.service';
import { InventoryService } from './services/inventory.service';
import { ProductService } from './services/product.service';
import { StoreService } from './services/store.service';
import { CategoryService } from './services/category.service';
import { CachcingServiceBase } from './services/caching.service';
import { DeliveryOptionsDataService } from './services/delivery-options.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { LocalStorageServie, StorageService } from './services/storage.service';
import { CityService} from './services/city.service';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './authentication.service';
import { OrderService } from './services/order.service';
import { PaymentService } from './services/paymentMethod.service';

import { AppHeaderComponent } from './app-header/app-header.component';

import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryDatatableComponent } from './inventory-list/inventory.datatable.component';
import { InventoryColumnComponent} from './inventory-list/inventory.column.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHomeSliderComponent } from './app-home-slider/app-home-slider.component';
import { AppServiceSectionComponent } from './app-service-section/app-service-section.component';
import { AppLatestNewsComponent } from './app-latest-news/app-latest-news.component';
import { AppProductDetailsComponent } from './app-product-details/app-product-details.component';
import { AppShopComponent } from './app-shop/app-shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ViewCartDetailComponent } from './view-cart-detail/view-cart-detail.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

// import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import {CustExtBrowserXhr} from '../../config/cust-ext-browser-xhr';
import { BrowserXhr } from '@angular/http';
import { CustomerProfileComponent } from './customer-dashboard/customer-profile/customer-profile.component';
import { CustomerOrdersComponent } from './customer-dashboard/customer-orders/customer-orders.component';
import { SalespersonDashboardComponent } from './salesperson-dashboard/salesperson-dashboard.component';
import { SalespersonProfileComponent } from './salesperson-dashboard/salesperson-profile/salesperson-profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryAddressComponent } from './checkout/delivery-address/delivery-address.component';
import { OrderReviewComponent } from './checkout/order-review/order-review.component';
import { PaymentComponent } from './checkout/payment/payment.component';
import { SalespersonCustomersComponent } from './salesperson-dashboard/salesperson-customers/salesperson-customers.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';

// export function getAuthHttp(http: Http) {
//   return new AuthHttp(new AuthConfig({
//     headerName: 'x-auth-token',
//     noTokenScheme: true,
//     noJwtError: true,
//     globalHeaders: [{'Accept': 'application/json'}],
//     tokenGetter: (() => localStorage.getItem('id_token')),
//   }), http);
// }

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    NavBarComponent,
    CustomerEditComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    AdminDashboardComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductDatatableComponent,
    ProductColumnComponent,
    InventoryComponent,

    SalespersonListComponent,
    SalespersonEditComponent,
    SalespersonColumnComponent,
    SalespersonDatatableComponent,

    CustomerColumnComponent,
    CustomerDatatableComponent,

    StoreViewComponent,
    StoreEditComponent,
    StoreColumnComponent,
    StoreDatatableComponent,
    
    AppHeaderComponent,

    InventoryListComponent,
    InventoryDetailComponent,
    InventoryEditComponent,
    InventoryColumnComponent,
    InventoryDatatableComponent,
    SalespersonDetailComponent,
    AppNavbarComponent,


    AppFooterComponent,
    AppHomeSliderComponent,
    AppServiceSectionComponent,
    AppLatestNewsComponent,
    AppProductDetailsComponent,
    AppShopComponent,
    FileSelectDirective,
    CustomerDashboardComponent,
    CustomerProfileComponent,
    CustomerOrdersComponent,
    AppLayoutComponent,
    ShoppingCartComponent,
    ViewCartDetailComponent,
    SalespersonDashboardComponent,
    SalespersonProfileComponent,
    CheckoutComponent,
    DeliveryAddressComponent,
    OrderReviewComponent,
    PaymentComponent,
    SalespersonCustomersComponent,
    SignupComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    // appRoutes,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: StorageService, useClass: LocalStorageServie },
    {provide: BrowserXhr, useClass: CustExtBrowserXhr},
    MeasureService,
    MessageService,
    CurrencyService,
    InventoryService,
    StoreService,
    ProductService,
    CategoryService,
    ShoppingCartService,
    DeliveryOptionsDataService,
    LocalStorageServie,
    StateService,
    CityService,
    CountryService,
    AlertService,
    OrderService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
