import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaigaModule} from "../tools/taiga.module";
import {LoginComponent} from "./components/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./token.interceptor";



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    TaigaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
