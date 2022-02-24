import { Injectable } from '@angular/core';
import {AuthApiService, IAuthData, ILoggedData} from "./auth-api.service";
import {Observable, of} from "rxjs";
import {catchError, mapTo, tap} from "rxjs/operators";
import {Router} from "@angular/router";

export interface IUser {
  email: string,
  name: string,
  city?: string,
  password: string,
  isAdmin?: boolean,
  isActivated?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public loggedUser: IUser | null = null;

  constructor(
    private readonly authApi: AuthApiService,
    private readonly router: Router,
    ) {
  }

  public login(authData: IAuthData): Observable<Boolean> {
    return this.authApi.auth(authData).pipe(
      tap(loggedData => this.doLoginUser(loggedData)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    )
  }

  public logout() {
      this.authApi.logout().pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }),
      ).subscribe(() => this.router.navigate(['/login']));
  }

  public get isLoggedIn() {
    return !!this.getJwtToken;
  }

  public refreshToken() {
    return this.authApi.refresh().pipe(
      tap(loggedData => this.storeAccessToken(loggedData.accessToken))
    );
  }

  public getLoggedUser() {
    return localStorage.getItem('currentUser') ? JSON.parse(<string>localStorage.getItem('currentUser')): null
  }

  public registerUser(userData: IUser) {
    return this.authApi.register(userData);
  }

  public get getJwtToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  private doLoginUser(loggedData: ILoggedData ) {
    this.loggedUser = loggedData.user;
    const {accessToken, refreshToken} = loggedData;
    this.storeTokens(accessToken, refreshToken);
    localStorage.setItem('currentUser', JSON.stringify(loggedData.user))
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private get getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeAccessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  private storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}
