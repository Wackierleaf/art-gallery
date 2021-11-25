import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import {LayoutAuthorizedRoutingModule} from "./layout-authorized-routing.module";
import { HeaderComponent } from './components/header/header.component';
import {MaterialExModule} from "../tools/material.module";
import {TranslateModule} from "@ngx-translate/core";
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    LayoutAuthorizedRoutingModule,
    MaterialExModule,
    TranslateModule
  ]
})
export class LayoutAuthorizedModule { }
