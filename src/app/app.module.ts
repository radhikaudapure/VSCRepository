import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {MaterialModule} from './material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { LoaderInterceptorService } from './loader/loader-interceptor.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MydiaryComponent } from './mydiary/mydiary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnderConstructionComponent } from './under-construction/under-construction.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    HomeComponent,
    HeaderComponent,
    MydiaryComponent,
    UnderConstructionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    // MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
