import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../auth/components/login/login.component";
import {LendingLayoutComponent} from "./components/lending-layout/lending-layout.component";

const lendingRoutes: Routes = [
  {path: '', component: LendingLayoutComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(lendingRoutes)],
  exports: [RouterModule]
})
export class LendingRoutingModule { }
