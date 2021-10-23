import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
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
