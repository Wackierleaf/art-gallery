import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import {LayoutAuthorizedRoutingModule} from "./layout-authorized-routing.module";
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutAuthorizedRoutingModule,
  ]
})
export class LayoutAuthorizedModule { }
