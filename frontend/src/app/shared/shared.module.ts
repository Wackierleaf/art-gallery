import { NgModule } from '@angular/core';
import {MaterialExModule} from "../tools/material.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    MaterialExModule,
    TranslateModule
  ]
})
export class SharedModule { }
