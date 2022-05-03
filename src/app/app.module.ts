import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EmployeeService} from "./services/employee.service";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    EmployeeCardComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
