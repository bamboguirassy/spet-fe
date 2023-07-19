import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temporary-payment-details',
  templateUrl: './temporary-payment-details.component.html',
  styleUrls: ['./temporary-payment-details.component.scss']
})
export class TemporaryPaymentDetailsComponent implements OnInit {
  transactionNumber: string = 'STT12345';
  amountPaid: string = '20000 FCFA';
  paymentMethod: string = 'Touchpay';
  date: string = '12/12/2023 a 12:00';

  constructor() { }

  ngOnInit(): void {
  }

}
