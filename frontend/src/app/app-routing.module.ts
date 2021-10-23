import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./tools/components/not-found/not-found.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {ArtWorksGuard} from "./auth/guards/art-works.guard";
import {MainGuard} from "./layout-authorized/guards/main.guard";
import {LendingLayoutComponent} from "./lending-layout/lending-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LendingLayoutComponent,
  },
  {
    path: 'main',
    loadChildren: () => import('./layout-authorized/layout-authorized.module').then(m => m.LayoutAuthorizedModule),
    canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'art-works',
    loadChildren: () => import('./art-works/art-works.module').then(m => m.ArtWorksModule),
    canActivate: [ArtWorksGuard],
    canLoad: [ArtWorksGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
