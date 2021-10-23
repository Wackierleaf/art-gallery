import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./guards/auth.guard";


const authRoutes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { };
