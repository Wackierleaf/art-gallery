import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "./auth.service";

export interface IAuthData {
  email: string;
  password: string;
}

export interface ILoggedData {
  accessToken: string,
  refreshToken: string,
  user: IUser,
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly LOGIN_URL = 'api/login';
  private readonly LOGOUT_URL = 'api/logout';
  private readonly REFRESH_URL ='api/refresh';

  constructor(private readonly http: HttpClient) { }

  public auth(authData: IAuthData): Observable<ILoggedData> {
    return this.http.post<ILoggedData>(this.LOGIN_URL, authData);
  }

  public logout(logoutData: IAuthData) {
    return this.http.post(this.LOGOUT_URL, logoutData);
  }

  public refresh(): Observable<ILoggedData> {
    return this.http.get<ILoggedData>(this.REFRESH_URL);
  }
}
