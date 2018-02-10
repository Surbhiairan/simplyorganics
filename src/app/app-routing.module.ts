import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FullLayout, SimpleLayout} from './admin/layouts';
import { AdminHomeComponent } from './admin/pages/adminhome/adminhome.component';
import { Dashboard2Component } from './admin/pages/dashboard_2/dashboard_2.component';
import { Dashboard3Component } from './admin/pages/dashboard_3/dashboard_3.component';
import { Dashboard4Component } from './admin/pages/dashboard_4/dashboard_4.component';
import { Dashboard5Component } from './admin/pages/dashboard_5/dashboard_5.component';
import { Datatable } from './admin/pages/datatable/datatable.component';
import { ChartJS } from './admin/pages/chartjs/chartjs.component';
import { Peity } from './admin/pages/peity/peity.component';
import { SparklineComponent } from './admin/pages/sparkline/sparkline.component';
import { MorrisChartComponent } from './admin/pages/morris-chart/morris-chart.component';
import { IconsComponent } from './admin/pages/icons/icons.component';
import { WidgetsComponent } from './admin/pages/widgets/widgets.component';
import { Mailbox } from './admin/pages/mailbox/mailbox.component';
import { MailView } from './admin/pages/mail.view/mail.view.component';
import { MailCompose } from './admin/pages/mail.compose/mail.compose.component';
import { Blog } from './admin/pages/blog/blog.component';
import { Article } from './admin/pages/article/article.component';
import { EcommerceProdutsBoard } from './admin/pages/ecommerce_products_board/ecommerce_products_board.component';
import { EcommerceProdutsList } from './admin/pages/ecommerce_products_list/ecommerce_products_list.component';
import { EcommerceProdutsEdit } from './admin/pages/ecommerce_products_edit/ecommerce_products_edit.component';
import { InvoiceComponent } from './admin/pages/invoice/invoice.component';
import { TimelineComponent } from './admin/pages/timeline/timeline.component';
import { FaqComponent } from './admin/pages/faq/faq.component';
import { ProfileComponent } from './admin/pages/profile/profile.component';
import { SearchComponent } from './admin/pages/search/search.component';
// import { LoginComponent } from './admin/pages/login/login.component';
import { LoginDarkComponent } from './admin/pages/login-dark/login-dark.component';
import { RegisterComponent } from './admin/pages/register/register.component';
import { RegisterDarkComponent } from './admin/pages/register-dark/register-dark.component';
import { ForgotPasswordComponent } from './admin/pages/forgot-password/forgot-password.component';
import { LockscreenComponent } from './admin/pages/lockscreen/lockscreen.component';
import { Error404Component } from './admin/pages/error-404/error-404.component';
import { Error500Component } from './admin/pages/error-500/error-500.component';
import { AppFooter, AppHeader, AppSidebar, AppThemeConfig, SessionModal} from './admin/components/index'
// import {CustomerEditComponent} from './admin/pages/customer-edit/customer-edit.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import { adminRoutes } from './admin/admin.routing';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent} from './login/login.component';

import { AppShopComponent } from './app-shop/app-shop.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppProductDetailsComponent } from './app-product-details/app-product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ViewCartDetailComponent } from './view-cart-detail/view-cart-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryAddressComponent } from './checkout/delivery-address/delivery-address.component';
import { OrderReviewComponent } from './checkout/order-review/order-review.component';
import { PaymentComponent } from './checkout/payment/payment.component';

import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerListComponent} from './customer-list/customer-list.component';

import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductListComponent} from './product-list/product-list.component';

import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

import {InventoryComponent} from './inventory/inventory.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

import {SalespersonListComponent} from './salesperson-list/salesperson-list.component';
import {SalespersonEditComponent} from './salesperson-edit/salesperson-edit.component';
import { SalespersonDetailComponent } from './salesperson-detail/salesperson-detail.component';

import {StoreEditComponent} from './store-edit/store-edit.component';
import {StoreViewComponent} from './store-view/store-view.component';

import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerOrdersComponent } from './customer-dashboard/customer-orders/customer-orders.component';
import { CustomerProfileComponent } from './customer-dashboard/customer-profile/customer-profile.component';
import { SalespersonDashboardComponent } from './salesperson-dashboard/salesperson-dashboard.component';
import { SalespersonProfileComponent } from './salesperson-dashboard/salesperson-profile/salesperson-profile.component';
import { SalespersonCustomersComponent } from './salesperson-dashboard/salesperson-customers/salesperson-customers.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      //{ path: 'home', component: HomeComponent },
      { path: 'shop', component: AppShopComponent },
      { path: 'shop/category/:cat_id', component: AppShopComponent },
      { path: 'product/productdetails/:product_id', component: AppProductDetailsComponent },
      { path: 'viewcart', component: ViewCartDetailComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      {
        path: 'checkout', component: CheckoutComponent,
        children: [
          { path: 'delivery', component: DeliveryAddressComponent},
          { path: 'order_review', component: OrderReviewComponent},
          { path: 'payment', component: PaymentComponent}
        ]
    }
    ]
  },
  // { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'login', component: LoginComponent},
  // { path: 'signup', component: SignupComponent},
  
  // {
  //   path: 'dashboard',
  //   component: CustomerDashboardComponent,
  //   canActivate: [AuthGuard]
  // },
  { path: 'customer', component: CustomerDashboardComponent, canActivate: [AuthGuard], 
  children: [
   // { path: '', component: CustomerDashboardComponent },
   { path: 'profile', component: CustomerProfileComponent},
   { path: 'orders', component: CustomerOrdersComponent},
    { path: 'dashboard', component: AdminDashboardComponent},
    { path: 'customerlist', component: CustomerListComponent},
    { path: 'customeredit', component: CustomerEditComponent},
    { path: 'customerdetail/:userid', component: CustomerDetailComponent},
    { path: 'productlist', component: ProductListComponent},
    { path: 'productedit', component: ProductEditComponent},
    { path: 'productdetail/:productid', component: ProductDetailComponent},
    { path: 'inventory', component: InventoryComponent},
    { path: 'inventorylist', component: InventoryListComponent},
    { path: 'inventoryedit', component: InventoryEditComponent},
    { path: 'inventorydetail/:inventoryid', component: InventoryDetailComponent},
    { path: 'storeview', component: StoreViewComponent},
    { path: 'storeedit', component: StoreEditComponent},
    { path: 'salespersonlist', component: SalespersonListComponent},
    { path: 'salespersonedit', component: SalespersonEditComponent},
    { path: 'salespersondetail/:userid', component: SalespersonDetailComponent},
    { path: 'dashboard_2', component: Dashboard2Component},
    { path: 'dashboard_3', component: Dashboard3Component},
    { path: 'dashboard_4', component: Dashboard4Component},
    { path: 'dashboard_5', component: Dashboard5Component},
    { path: 'datatable', component: Datatable},
    { path: 'chartjs', component: ChartJS},
    { path: 'charts-peity', component: Peity},
    { path: 'charts-sparkline', component: SparklineComponent},
    { path: 'charts-morris', component: MorrisChartComponent},
    { path: 'widgets', component: WidgetsComponent},
    { path: 'icons', component: IconsComponent},
    { path: 'mailbox', component: Mailbox},
    { path: 'mail_view', component: MailView},
    { path: 'mail_compose', component: MailCompose},
    { path: 'blog', component: Blog},
    { path: 'article', component: Article},
    { path: 'ecommerce_products_board', component: EcommerceProdutsBoard},
    { path: 'ecommerce_products_list', component: EcommerceProdutsList},
    { path: 'ecommerce_products_edit', component: EcommerceProdutsEdit},
    { path: 'invoice', component: InvoiceComponent},
    { path: 'timeline', component: TimelineComponent},
    { path: 'faq', component: FaqComponent},
    { path: 'search', component: SearchComponent},
    { path: 'profile', component: ProfileComponent},
  ]
},
{ path: 'salesperson', component: SalespersonDashboardComponent, canActivate: [AuthGuard],
children: [
  { path: 'profile', component: SalespersonProfileComponent },
  { path: 'customer', component: SalespersonCustomersComponent },
  { path: 'dashboard', component: AdminDashboardComponent},
  { path: 'customerlist', component: CustomerListComponent},
  { path: 'customeredit', component: CustomerEditComponent},
  { path: 'customerdetail/:userid', component: CustomerDetailComponent},
  { path: 'productlist', component: ProductListComponent},
  { path: 'productedit', component: ProductEditComponent},
  { path: 'productdetail/:productid', component: ProductDetailComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'inventorylist', component: InventoryListComponent},
  { path: 'inventoryedit', component: InventoryEditComponent},
  { path: 'inventorydetail/:inventoryid', component: InventoryDetailComponent},
  { path: 'storeview', component: StoreViewComponent},
  { path: 'storeedit', component: StoreEditComponent},
  { path: 'salespersonlist', component: SalespersonListComponent},
  { path: 'salespersonedit', component: SalespersonEditComponent},
  { path: 'salespersondetail/:userid', component: SalespersonDetailComponent},
  { path: 'dashboard_2', component: Dashboard2Component},
  { path: 'dashboard_3', component: Dashboard3Component},
  { path: 'dashboard_4', component: Dashboard4Component},
  { path: 'dashboard_5', component: Dashboard5Component},
  { path: 'datatable', component: Datatable},
  { path: 'chartjs', component: ChartJS},
  { path: 'charts-peity', component: Peity},
  { path: 'charts-sparkline', component: SparklineComponent},
  { path: 'charts-morris', component: MorrisChartComponent},
  { path: 'widgets', component: WidgetsComponent},
  { path: 'icons', component: IconsComponent},
  { path: 'mailbox', component: Mailbox},
  { path: 'mail_view', component: MailView},
  { path: 'mail_compose', component: MailCompose},
  { path: 'blog', component: Blog},
  { path: 'article', component: Article},
  { path: 'ecommerce_products_board', component: EcommerceProdutsBoard},
  { path: 'ecommerce_products_list', component: EcommerceProdutsList},
  { path: 'ecommerce_products_edit', component: EcommerceProdutsEdit},
  { path: 'invoice', component: InvoiceComponent},
  { path: 'timeline', component: TimelineComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'search', component: SearchComponent},
  { path: 'profile', component: ProfileComponent},
]
},
  { path: 'productdetails', component: AppProductDetailsComponent },
  { path: 'admin', component: FullLayout, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'customerlist', component: CustomerListComponent},
      { path: 'customeredit', component: CustomerEditComponent},
      { path: 'customerdetail/:userid', component: CustomerDetailComponent},
      { path: 'productlist', component: ProductListComponent},
      { path: 'productedit', component: ProductEditComponent},
      { path: 'productdetail/:productid', component: ProductDetailComponent},
      { path: 'inventory', component: InventoryComponent},
      { path: 'inventorylist', component: InventoryListComponent},
      { path: 'inventoryedit', component: InventoryEditComponent},
      { path: 'inventorydetail/:inventoryid', component: InventoryDetailComponent},
      { path: 'storeview', component: StoreViewComponent},
      { path: 'storeedit', component: StoreEditComponent},
      { path: 'salespersonlist', component: SalespersonListComponent},
      { path: 'salespersonedit', component: SalespersonEditComponent},
      { path: 'salespersondetail/:userid', component: SalespersonDetailComponent},
      { path: 'dashboard_2', component: Dashboard2Component},
      { path: 'dashboard_3', component: Dashboard3Component},
      { path: 'dashboard_4', component: Dashboard4Component},
      { path: 'dashboard_5', component: Dashboard5Component},
      { path: 'datatable', component: Datatable},
      { path: 'chartjs', component: ChartJS},
      { path: 'charts-peity', component: Peity},
      { path: 'charts-sparkline', component: SparklineComponent},
      { path: 'charts-morris', component: MorrisChartComponent},
      { path: 'widgets', component: WidgetsComponent},
      { path: 'icons', component: IconsComponent},
      { path: 'mailbox', component: Mailbox},
      { path: 'mail_view', component: MailView},
      { path: 'mail_compose', component: MailCompose},
      { path: 'blog', component: Blog},
      { path: 'article', component: Article},
      { path: 'ecommerce_products_board', component: EcommerceProdutsBoard},
      { path: 'ecommerce_products_list', component: EcommerceProdutsList},
      { path: 'ecommerce_products_edit', component: EcommerceProdutsEdit},
      { path: 'invoice', component: InvoiceComponent},
      { path: 'timeline', component: TimelineComponent},
      { path: 'faq', component: FaqComponent},
      { path: 'search', component: SearchComponent},
      { path: 'profile', component: ProfileComponent},
    ]
}
  // { path: 'login', component: FullLayout},
  // children: [
  //   { path: '', component: AdminHomeComponent }, // url: about/

  // ]

  // {// path: '**', component: HomeComponent },
  // ...adminRoutes,
];

// const routes: Routes = [
//    {path: '', redirectTo:'/admin/home', pathMatch: 'full'},
//     ...appRoutes,
//    //{path: 'admin', component: AdminComponent}
//    //{path: 'home', component: HomeComponent}
//    // { path: '/admin/home/customer_edit', component: CustomerEditComponent},

// ]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard,
    AnonymousGuard
  ],
  declarations: [
    FullLayout, SimpleLayout,
    AdminHomeComponent,
    Dashboard2Component, Dashboard3Component, Dashboard4Component, Dashboard5Component, Datatable, 
    ChartJS, Peity, SparklineComponent, MorrisChartComponent, IconsComponent, WidgetsComponent,
    Mailbox, MailView, MailCompose, Blog, Article, EcommerceProdutsBoard, EcommerceProdutsList, EcommerceProdutsEdit, 
    InvoiceComponent, TimelineComponent, FaqComponent, ProfileComponent, SearchComponent,
    LoginDarkComponent,
    RegisterComponent,
    RegisterDarkComponent,
    ForgotPasswordComponent,
    LockscreenComponent,
    Error404Component,
    Error500Component,
    AppSidebar,
    AppFooter,
    AppFooter,
    AppHeader,
    SessionModal,
    AppThemeConfig,

    // CustomerEditComponent,
  ]
})
export class AppRoutingModule {}