import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements AfterViewInit {
  @Input()
  amount: number = 0;

  @Input()
  label: string = '';

  elements:any;
  paymentRequest:any;
  prButton:any;

  @ViewChild('payElemet') payElement:any;
  constructor( private pmt:PaymentsService) { }
  ngAfterViewInit(): void {
    this.paymentRequest = this.pmt.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        amount : this.amount,
        label : this.label
      }
    });
    this.elements = this.pmt.stripe.elements();

    this.paymentRequest.on('source', async (event:any) => {
      console.log(event);

      setTimeout(() => {
        event.complete("Success")
      }, 1000);
    });

    this.prButton = this.elements.create('paymentRequestButton',{
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'buy',
          theme: 'dark'
        }
      }
    });

    this.mountButton();
  }
  async mountButton() {
    const result = await this.paymentRequest.canMakePayment();

    if (result){
      this.prButton.mount(this.payElement.nativeElement);
    } else {
      console.error('your browser is old school');
    }
  }


}
