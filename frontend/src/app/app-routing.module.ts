import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {NotFoundComponent} from "./tools/components/not-found/not-found.component";
import {LendingLayoutComponent} from "./lending/components/lending-layout/lending-layout.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {ArtWorkComponent} from "./art-works/components/art-work/art-work.component";
import {ArtWorksGuard} from "./auth/guards/art-works.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: '', component: LendingLayoutComponent},
  {path: 'art-works', component: ArtWorkComponent, canActivate: [ArtWorksGuard], canLoad: [ArtWorksGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
