import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { TryService } from '../try.service';

@Component({
  selector: 'app-tryone',
  templateUrl: './tryone.component.html',
  styleUrls: ['./tryone.component.css']
})
export class TryoneComponent implements OnInit {
  elements: any;
  card: any;
  paymentRequest: any;
  paymentRequestElement: any;

  constructor(private pmt:TryService) { }

  ngOnInit(): void {
    this.elements = this.pmt.stripe.elements({
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use `locale: 'auto'` instead.
      locale: "ca"
    });
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
    this.card.mount("#example5-card");

    this.paymentRequest = this.pmt.stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        amount: 2500,
        label: "Total"
      },
      requestShipping: true,
      shippingOptions: [
        {
          id: "free-shipping",
          label: "Free shipping",
          detail: "Arrives in 5 to 7 days",
          amount: 0
        }
      ]
    });
    this.paymentRequest.on("token", function(result:any) {
      let example:any = document.querySelector(".example5");
      example.querySelector(".token").innerText = result.token.id;
      example.classList.add("submitted");
      result.complete("success");
    });
  
    this.paymentRequestElement = this.elements.create("paymentRequestButton", {
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: {
          theme: "light"
        }
      }
    });
  
    this.paymentRequest.canMakePayment().then((result:any)=> {
      if (result) {
        // document.querySelector(".example5 .card-only").style.display = "none";
        // document.querySelector(
        //   ".example5 .payment-request-available"
        // ).style.display =
        //   "block";
        this.paymentRequestElement.mount("#example5-paymentRequest");
      }
    });
  
    // this.pmt.registerElements([this.card], "example5");
  }

}

