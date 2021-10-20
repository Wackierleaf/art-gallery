import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LendingLayoutComponent} from "./components/lending-layout/lending-layout.component";

const lendingRoutes: Routes = [

];


@NgModule({
  imports: [RouterModule.forChild(lendingRoutes)],
  exports: [RouterModule]
})
export class LendingRoutingModule { }
