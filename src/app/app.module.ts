import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppprizesService } from './services/appprizes.service';

import { SecurityGuard } from './services/security.guard';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CodecuponComponent } from './codecupon/codecupon.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { WinnerComponent } from './winner/winner.component';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    CodecuponComponent,
    ThankyouComponent,
    WinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ModalModule.forRoot(),
  ],
  providers: [AppprizesService, SecurityGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
