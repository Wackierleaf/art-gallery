import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LayoutComponent} from "./components/layout/layout.component";

const layoutRoutes: Routes = [
  {path: '', component: LayoutComponent},
];


@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule]
})
export class LayoutAuthorizedRoutingModule { }
