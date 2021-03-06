import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ArtWorksGuard implements CanActivate, CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  canActivate() {
    return this.canLoad();
  }

  canLoad(){
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    return this.authService.isLoggedIn;
  }
}
