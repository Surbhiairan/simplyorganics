import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { AdminComponent } from './admin.component';

// Import layouts
import {
  FullLayout,
  SimpleLayout
} from './layouts';

const APP_LAYOUTS = [
  FullLayout,
  SimpleLayout
]

// Import components
import {
  AppHeader,
  AppFooter,
  AppSidebar,
  AppThemeConfig,
  SessionModal
  
} from './components';

const APP_COMPONENTS = [
  AppFooter,
  AppHeader,
  AppSidebar,
  AppThemeConfig,
  SessionModal
]

// Import routing module
import { AppRoutingModule } from './admin.routing';
//import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AdminComponent,
    ...APP_LAYOUTS,
    ...APP_COMPONENTS,
    //CustomerEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
