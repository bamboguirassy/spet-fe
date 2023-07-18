import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface City {
    name: number;
    code: number;
}



@Component({
    selector: 'app-temporary-payment-form',
    templateUrl: './temporary-payment-form.component.html',
    styleUrls: ['./temporary-payment-form.component.scss']
})
export class TemporaryPaymentFormComponent implements OnInit {

    cities: City[] | undefined;

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.cities = [
            { name: 1, code: 1 },
            { name: 2, code: 2 },
            { name: 3, code: 3},
        ];

        this.formGroup = new FormGroup({
            // selectedCity: new FormControl<City | null>(null)
            selectedCity: new FormControl<City | null>(null)
        });
    }

}






