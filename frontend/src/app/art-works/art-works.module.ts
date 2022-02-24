import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtWorkComponent } from './components/art-work/art-work.component';
import {ArtManagementPanelComponent} from "./components/art-management-panel/art-management-panel.component";
import {MaterialExModule} from "../tools/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ArtCardComponent} from "./components/art-card/art-card.component";
import { AddArtModalComponent } from './components/add-art-modal/add-art-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgImageSliderModule} from "ng-image-slider";



@NgModule({
  declarations: [
    ArtWorkComponent,
    ArtManagementPanelComponent,
    ArtCardComponent,
    AddArtModalComponent,
  ],
  exports: [
    ArtManagementPanelComponent,
    ArtCardComponent
  ],
  imports: [
    CommonModule,
    MaterialExModule,
    TranslateModule,
    ReactiveFormsModule,
    NgImageSliderModule
  ]
})
export class ArtWorksModule { }
