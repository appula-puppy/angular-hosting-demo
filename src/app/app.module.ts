import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { TryoneComponent } from './tryone/tryone.component';
import { StripeComponent } from './stripe/stripe.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentRequestComponent,
    TryoneComponent,
    StripeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
