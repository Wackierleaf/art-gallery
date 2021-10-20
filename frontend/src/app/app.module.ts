import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {LendingModule} from "./lending/lending.module";
import {API_URL, ApiInterceptor} from "./api.interceptor";
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {MaterialExModule} from "./tools/material.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://localhost:4200/assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    LendingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialExModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: API_URL,useValue: environment.server},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true, deps: [API_URL]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
