import { NgModule } from '@angular/core';
import { ArtCardComponent } from './art-card/art-card.component';
import {MaterialExModule} from "../tools/material.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    ArtCardComponent
  ],
  exports: [
    ArtCardComponent
  ],
  imports: [
    MaterialExModule,
    TranslateModule
  ]
})
export class SharedModule { }
