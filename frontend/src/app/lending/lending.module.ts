import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendingLayoutComponent } from './components/lending-layout/lending-layout.component';
import {LendingRoutingModule} from "./lending-routing.module";



@NgModule({
  declarations: [
    LendingLayoutComponent
  ],
  imports: [
    CommonModule,
    LendingRoutingModule
  ]
})
export class LendingModule { }
