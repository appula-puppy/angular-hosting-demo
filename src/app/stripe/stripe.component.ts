import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { environment } from 'src/environments/environment';
import { StripeScriptService } from '../script.service';

declare var Stripe: any;
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {
  @ViewChild('example5', { static: true })
  cardInfo!: ElementRef;
  card: any;
  result: any;
  stripe: any;
  elements: any;
  stripeLoaded!: boolean;

  constructor(private stripeScriptService: StripeScriptService) {}

  ngOnInit(): void {
    if (!this.stripeLoaded) {
      this.stripeScriptService.registerScript(() => {
        this.stripe = Stripe(environment.stripekey);
        this.elements = this.stripe.elements();
        this.card = this.elements.create("card", {
          iconStyle: "solid",
          style: {
            base: {
              iconColor: "#fff",
              color: "#fff",
              fontWeight: 400,
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "16px",
              fontSmoothing: "antialiased",
      
              "::placeholder": {
                color: "#BFAEF6"
              },
              ":-webkit-autofill": {
                color: "#fce883"
              }
            },
            invalid: {
              iconColor: "#FFC7EE",
              color: "#FFC7EE"
            }
          }
        });
        this.card.mount(this.cardInfo.nativeElement);
        console.log(this.cardInfo.nativeElement);
        this.stripeLoaded = true;
      });
    }
  }

  testStripe(): void {
    console.log("papulu", this.card );
    this.stripe.createToken(this.card).then((token: any) => {
      this.result = token;
    });
  }
}