import { Component, OnInit } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';



@Component({
  selector: 'app-temporary-payment-form',
  templateUrl: './temporary-payment-form.component.html',
  styleUrls: ['./temporary-payment-form.component.scss']
})
export class TemporaryPaymentFormComponent implements OnInit {

  // constructor() { }
  groupedCities: SelectItemGroup[];

    selectedCity: string | undefined;

    constructor() {
        this.groupedCities = [
            {
                label: '',
                // value: 'de',
                items: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' }
                ]
            },
        ];
    }

  ngOnInit() {
  }

}






